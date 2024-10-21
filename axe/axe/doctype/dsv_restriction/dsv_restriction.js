// Copyright (c) 2024, Crm and contributors
// For license information, please see license.txt
function locations_card(frm) {
    frappe.call({
        method: 'axe.axe.doctype.accounts.accounts.get_accounts_with_location_counts',
        args: {},
        callback: function (val) {
            const accounts = val.message; 

            let accountLocationCounts = {};
            accounts.forEach(account => {
                accountLocationCounts[account.account_name] = account.location_count;
            });

            new frappe.ui.form.MultiSelectDialog({
                doctype: "Accounts",
                target: frm,
                setters: {
                    account_name: null,
                },
                get_query: function () {
                    let selectedAccounts = frm.doc.location_table.reduce((acc, row) => {
                        acc[row.account] = (acc[row.account] || 0) + 1;
                        return acc;
                    }, {});
                        let validAccounts = Object.keys(accountLocationCounts).filter(account => {
                            return selectedAccounts[account] === undefined || selectedAccounts[account] < accountLocationCounts[account];
                        });
    
                        return {
                            filters: [
                                ['name', 'in', validAccounts],
                            ]
                    };
                },
                primary_action_label: "Get Locations",
                action(selections) {
                    selections.forEach(element => {
                        if (element) {
                            // console.log("element",element);
                            
                            let count = frm.doc.location_table.reduce((acc, row) => {
                                return acc + (row.account === element ? 1 : 0); 
                            }, 0);
                            // console.log("count",count);

                            let maxCount = accountLocationCounts[element];
                            // console.log("max",maxCount);

                            if (count < maxCount) {
                                let child_row = frm.add_child('location_table');
                                child_row.account = element; 
                                bind_location_options(frm, child_row, element);
                            } else {
                                frappe.msgprint(__('You cannot add more locations for account: {0}. Maximum allowed: {1}.', [element, maxCount]));
                            }
                        }
                    });
                    cur_dialog.hide();
                    updateCounts(frm);
                    frm.refresh_field('location_table');
                },
            });
        }
    });
}
function bind_location_options(frm, row, account_name) {
    frappe.call({
        method: 'axe.axe.doctype.accounts.accounts.get_selected_locations',
        args: { name: account_name },
        callback: function (response) {
            const locations = response.message || [];
            locations.unshift("");  

            let selectedLocations = frm.doc.location_table
                .filter(r => r.account === account_name)
                .map(r => r.location);

            const availableLocations = locations.filter(loc => !selectedLocations.includes(loc));

            if (availableLocations.length === 1) { 
                frappe.msgprint(__('All locations for account {0} are already selected.', [account_name]));
            } else {
                const location_options = availableLocations.join("\n");

                frm.fields_dict['location_table'].grid.update_docfield_property(
                    'location', 'options', location_options
                );

                frappe.model.set_value(row.doctype, row.name, 'location', availableLocations[1] || null); 
                frm.refresh_field('location_table');
            }
        }
    });
}
function product_card(frm, selected_products) {
     new frappe.ui.form.MultiSelectDialog({
        doctype: "Item Mapping Master",
        target: frm,
        setters: {
            parent_item: null,  
            child_item:null
        },
        get_query() {
            return {
                filters: [
                    ['Item Mapping Master', 'child_item', 'not in', selected_products],
                ]
            };
        }, 
        primary_action_label: "Get Products",
        action(selections) {
            selections.forEach(element => {
                if (element) {
                    frappe.call({
                        method: 'frappe.client.get',
                        args: {
                            doctype: "Item Mapping Master",
                            filters: {
                                name: element,
                             }
                        },
                        callback: function (val) {
                            if (val.message) {
                                let child_row = frm.add_child('product_table');
                                child_row.products = val.message.child_item;
                                child_row.item_group = val.message.parent_item;
                                child_row.category = val.message.category;
                                frm.refresh_field('product_table');
                                updateCounts(frm);
                            }
                        }
                    });
                }
            });
            cur_dialog.hide(); 
        }
    });
}
frappe.ui.form.on('DSV Restriction', {
    onload: function (frm) {
        if (frm.is_new()) {
            frm.toggle_display('product_table', true);  
            frm.toggle_display('location_table', true);  
        } else {
            initializeCards(frm);
            frm.fields_dict.add_products.$wrapper.find('.product-card').on('click', () => {
                frm.toggle_display('product_table', true);
            });
    
            frm.fields_dict.add_locations.$wrapper.find('.location-card').on('click', () => {
                frm.toggle_display('location_table', true);
            });
        }
    },
    refresh: function (frm) {
        if (frm.is_new()) {
            frm.toggle_display('product_table', true);  
            frm.toggle_display('location_table', true);  
        } else {
            initializeCards(frm);
            frm.fields_dict.add_products.$wrapper.find('.product-card').on('click', () => {
                frm.toggle_display('product_table', true);
            });
    
            frm.fields_dict.add_locations.$wrapper.find('.location-card').on('click', () => {
                frm.toggle_display('location_table', true);
            });
        }
        updateCounts(frm);
       
    },
});

function updateCounts(frm) {
    selected_products = frm.doc.product_table.map(row => row.products);
    // console.log(selected_products);
    $('#products').text(selected_products.length);
    selected_locations = frm.doc.location_table
        .map(row => row.account);
    // .filter(location => location && location.trim() !== '');  
    // console.log(selected_locations);
    $('#location').text(selected_locations.length);
}

function set_product_filter(frm) {
    frm.fields_dict['product_table'].grid.get_field('products').get_query = function (doc, cdt, cdn) {
      
        let selected_products = frm.doc.product_table.map(function (row) {
            return row.products;
        });
    };
}
frappe.ui.form.on('Product Child', {
    product_table_add: function (frm, cdt, cdn) {
        
        remove_last_row(frm, 'product_table');
        product_card(frm,selected_products); 
        updateCounts(frm);
        // set_product_filter(frm) 

    },
    product_table_remove: function (frm, cdt, cdn) {
       
        set_product_filter(frm) 
        updateCounts(frm);
    },
    
});


function remove_last_row(frm, table_name) {
    if (frm.doc[table_name].length > 0) {
        frm.doc[table_name].splice(-1, 1);
        frm.refresh_field(table_name);
    }
}
frappe.ui.form.on('Account Child', {
    location_table_add: function (frm, cdt, cdn) {
        remove_last_row(frm, 'location_table');
        locations_card(frm, selected_locations);
        updateCounts(frm);
        // apply_account_filters(frm);
        // set_account_filter(frm);
    },
    location_table_remove: function (frm, cdt, cdn) {
        // set_account_filter(frm);
        updateCounts(frm);

    },
  
});
function initializeCards(frm) {
    const loc_card_html = `
        <div class="location-card" style="
            ${getCardStyle()}">
            <h3>Locations</h3>
            <div id="location" style="font-size: 36px; font-weight: bold;">Loading...</div>
        </div>`;

    const prod_card_html = `
        <div class="product-card" style="
            ${getCardStyle()}
           ">
            <h3>Products</h3>
            <div id="products" style="font-size: 36px; font-weight: bold;">Loading...</div>
        </div>`;

    frm.fields_dict.add_locations.$wrapper.html(loc_card_html);
    frm.fields_dict.add_products.$wrapper.html(prod_card_html);
    observeThemeChanges('location-card');
    observeThemeChanges('product-card');
}

