// // Copyright (c) 2024, Crm and contributors
// // For license information, please see license.txt
frappe.ui.form.on('Location', {
    onload: function (frm) {
        frm.trigger('country');        
    },
    country_: function (frm) {
            frm.set_query('state', function () {
                return {
                    filters: {
                        'country': frm.doc.country_  
                    }
                };
            }); 
    },        
    refresh: function (frm) {
        if (frm.doc.country_) {
            frm.trigger('country_');
        }                            
    },
    
});
frappe.ui.form.on('Contact Child', {
    contact_add: function (frm, cdt, cdn) {
        set_contact_filter(frm); 
       
    },
    contact_remove: function (frm,cdt,cdn) {
        set_contact_filter(frm);
    }
});

function set_contact_filter(frm) {
    frm.fields_dict['contact'].grid.get_field('contact').get_query = function (doc, cdt, cdn) {
      
      let selected_contacts = frm.doc.contact.map(function (row) {
            return row.contact;
        });
        console.log(selected_contacts);
        
        return {
            filters: [
                ['Contacts', 'name', 'not in', selected_contacts],
                // ['Location', 'contact','is','not set']
            ]
        };
    };
}


frappe.ui.form.on('Location', {
    onload: function (frm) {
        Custom_card(frm);
    },
    refresh: function (frm) {
        Custom_card(frm);
       
    },
});

function Custom_card(frm) {
    const card_html = `
    <div class="custom-card" style="${getCardStyle()}">
        <h3>Restrictions</h3>
        <div id="restriction-count" style="font-size: 36px; font-weight: bold;">Loading...</div>
    </div>
    `;
    const contact_html = `
    <div class="contact-card" style="${getCardStyle()}">
        <h3>Contacts</h3>
        <div id="contact-count" style="font-size: 36px; font-weight: bold;">Loading...</div>
    </div>
    `;

    frm.fields_dict.count_card.$wrapper.html(card_html);
    frm.fields_dict.contact_count.$wrapper.html(contact_html);

    if (!frm.is_new()) {
        frm.toggle_display('contact_count', true);
    }

    observeThemeChanges('custom-card');
    observeThemeChanges('contact-card');

    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'DSV Restriction',
            filters: [
                ['Account Child', 'location', '=', frm.doc.name]
            ],
            fields: ['name'],
        },
        callback: function (response) {
            let count = response.message.length;
            $('#restriction-count').text(count); 
        },
    });

    let selected_contacts = frm.doc.contact.map(function (row) {
        return row.contact;
    });
    // console.log("Selected Contacts (for Contact Card):", selected_contacts);

    $('#contact-count').text(selected_contacts.length);

    frm.fields_dict.count_card.$wrapper.find('.custom-card').on('click', function () {
        frappe.set_route('Form', 'DSV Restriction', { location: frm.doc.name });
    });
    frm.fields_dict.contact_count.$wrapper.find('.contact-card').on('click', function () {
        frappe.set_route('List', 'Contacts', { name: ['in', selected_contacts] });
    });
    frm.fields_dict['dock_time'].grid.wrapper.on('focus', 'input[data-fieldname="days"]', function (e) {
        let row_idx = $(this).closest('.grid-row').data('idx'); 
        let child_row = frm.fields_dict['dock_time'].grid.grid_rows[row_idx - 1].doc; 
        daymultiselect(frm, child_row);  
    });
}
function daymultiselect(frm, child_row) {
    let all_selected_days = [];
    frm.doc.dock_time.forEach(row => {
        if (row.days) {
            all_selected_days = all_selected_days.concat(row.days.split(", ").map(day => day.trim()));
        }
    });

    all_selected_days = [...new Set(all_selected_days)];

    let selected_days = (child_row.days || "").split(", ").map(day => day.trim());
    // console.log("Currently selected days for this Table :", all_selected_days);
    new frappe.ui.form.MultiSelectDialog({
        doctype: "Days",
        target:frm,
        setters: {
            days:null
        },
        get_query() {
            return {
                filters: [
                    ['Days', 'name', 'not in', all_selected_days]
                ]
            };
        },
        primary_action_label: "Update Days",
        action(selections) {
            updated_days = selected_days.slice();

            selections.forEach(day => {
                if (day && !updated_days.includes(day)) {
                    updated_days.push(day);
                }
            });

            child_row.days = updated_days.join(", ").replace(/^,|,$/g, "");
           
            frm.refresh_field('dock_time');
            cur_dialog.hide();

        },
        
    });
    cur_dialog.hide();
}

frappe.ui.form.on('Supplies', {
    supplies_add: function (frm, cdt, cdn) {
        frm.toggle_display('supplies_notes', true);
        frm.refresh_field('supplies_notes');
    },
    supplies_remove: function(frm, cdt, cdn) {
        if (frm.doc.supplies && frm.doc.supplies.length === 0) {
            frm.toggle_display('supplies_notes', false);
        }
        frm.refresh_field('supplies_notes');
    },
});

