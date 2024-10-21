frappe.ui.form.on("Item Attribute Option Child", {
    item: function(frm, cdt, cdn) {  
        getAttributes(frm, cdt, cdn);  
    },
    onload: function(frm, cdt, cdn){
        getAttributes(frm, cdt, cdn);  
    }
});

frappe.ui.form.on("Item Attribute Option Mapping", {
    refresh: function(frm) { 
        frm.fields_dict["table_cdix"].grid.grid_rows.forEach(function(row) {
            // Call getAttributes for each row during refresh to set filters
            getAttributes(frm, row.doc.doctype, row.doc.name);  
        });
    }
});

function getAttributes(frm, cdt, cdn) {    
    let row = locals[cdt][cdn];  // Get the current row context
    let item_value = row.item;    // Get the item value from the current row
    console.log("Row item value:", item_value);

    if (item_value) {
        frappe.call({
            method: 'axe.axe.doctype.item_attribute_option_mapping.item_attribute_option_mapping.get_item_attribute_mapping',
            args: {
                item: item_value
            },
            callback: function(response) {
                console.log("Response:", response);

                let attribute_names = [];  // Ensure a fresh array for each row's attributes

                response.message.forEach(function(row_data) {
                    attribute_names.push(row_data.item_attribute); // Collect attribute names
                });

                console.log("Attribute names for row:", attribute_names);

                // Set the query for the specific row's attribute_name field
                frm.fields_dict["table_cdix"].grid.grid_rows_by_docname[cdn].get_field("attribute_name").get_query = function(doc, cdt, cdn) {
                    return {
                        filters: [
                            ['Item Attribute', 'name', 'in', attribute_names]
                        ]
                    };
                };

                // Refresh the field in the specific row to apply the filter
                frm.refresh_field('table_cdix');
            }
        });
    } else {
        // Reset the filter if no item is selected
        frm.fields_dict["table_cdix"].grid.grid_rows_by_docname[cdn].get_field("attribute_name").get_query = function(doc, cdt, cdn) {
            return {
                filters: [
                    ['Item Attribute', 'name', 'in', []] // Empty filter
                ]
            };
        };

        // Refresh the field to remove any filter
        frm.refresh_field('table_cdix');
    }
}