frappe.ui.form.on("Inbound Inquiry", {
    onload:function(frm){
    if(!frm.is_new()){
        load_contact(frm)
    }
    },
    refresh: function(frm) {
        if(frm.doc.locations){
        load_contact(frm)
        }
        // Initial check on form load to disable or enable based on the value of order_type
        toggle_purchase_order_field(frm); 

        // frm.fields_dict['logistics'].df.onchange = function(val){
        //     console.log("qwerqwerqwerqwe", frm.doc.logistics);
            
        //     console.log("qwer", val);
        // }

        // On form refresh, apply the toggle logic to all rows in the 'logistics' child table
        frm.fields_dict['logistics'].grid.grid_rows.forEach(function(row) {
            toggle_charge_and_invoice_fields(frm, row.doc);
        });

    },
 locations: function(frm) { 
    if(frm.doc.locations){
        load_contact(frm)
    }
    },
    order_type: function(frm) {
        // Triggered when the order_type field is changed
        toggle_purchase_order_field(frm);
    },
    purchase_order: function(frm) {
        // Fetch csr and sales from the linked Purchase Order
        if (frm.doc.purchase_order) {
            frappe.db.get_doc('Purchase Order', frm.doc.purchase_order)
            .then(doc => {
                console.log(doc)
                frm.set_value('csr', doc.csr);  // Set CSR value
                frm.set_value('sales', doc.sales);  // Set Sales value
            });
        } else {
            frm.set_value('csr', null);  // Clear CSR if no Purchase Order is selected
            frm.set_value('sales', null);  // Clear Sales if no Purchase Order is selected
        }
    },

});
function load_contact(frm){
    const account_name = frm.doc.locations;
    // Call the server-side method to fetch locations
    frappe.call({
        method: 'axe.axe.doctype.accounts.accounts.get_selected_contacts',
        args: {
            name: account_name
        },
        callback: function(response) {
            if (response.message) {
                // Assuming response.message contains the locations
                console.log(response.message);
                // You can now do something with the locations, e.g., display them

                   // Assuming response.message contains an array of location values
                   const contacts = response.message;

                   // Clear current options
                   frm.set_df_property('onsite_contact', 'options', contacts);
                   console.log("LLLLLLLLLLLL",contacts);
                   contacts.unshift("");
                   // Optionally, set the first location as the default selected value
                   if (contacts.length > 0) {
                       frm.set_value('onsite_contact', contacts[1]);
                   }    
            }
        }
    });
}
function toggle_purchase_order_field(frm) {
    // Always display the purchase_order field
    frm.toggle_display('purchase_order', true);

    if (frm.doc.order_type === "Purchase Order") {
        // Enable the purchase_order field (make it editable)
        frm.set_df_property('purchase_order', 'read_only', 0);
    } if (frm.doc.order_type === "Open Order") {
        // Enable the purchase_order field (make it editable)
        frm.set_value('purchase_order', null);
        frm.set_df_property('purchase_order', 'read_only', 1);
    } else {
        // Disable the purchase_order field (make it read-only but visible)
        frm.set_df_property('purchase_order', 'read_only', 0);
    }

    // Refresh the field to apply changes
    frm.refresh_field('purchase_order');
}

frappe.ui.form.on('Inbound Logistics', {
    logistics_type: function(frm, cdt, cdn) {
        // When the logistics_type field in the child table is changed
        let row = locals[cdt][cdn];
        toggle_charge_and_invoice_fields(frm, row);
    },
    inbound_logistics_add: function(frm, cdt, cdn) {
        // Trigger the toggle logic when a new row is added
        let row = locals[cdt][cdn];
        toggle_charge_and_invoice_fields(frm, row);
    },
    inbound_logistics_remove: function(frm, cdt, cdn) { 
        // When a row is removed, refresh the child table
        frm.refresh_field('logistics');
    }
});



function toggle_charge_and_invoice_fields(frm, row) {
    // Ensure we are working with the correct child table fieldname
    let grid = frm.fields_dict['logistics'].grid;

    if (grid && grid.grid_rows_by_docname[row.name]) {
        let grid_row = grid.grid_rows_by_docname[row.name];

        // Condition to toggle fields based on logistics_type
        if (row.logistics_type === "Delivered") {

            // Disable fields in the row
            grid_row.toggle_editable('charge_to_client', false);
            grid_row.toggle_editable('final_invoice_amount', false);

            // Disable "Charge to Client" and "Final Invoice Amount"
            frappe.model.set_value(row.doctype, row.name, 'charge_to_client', null);
            frappe.model.set_value(row.doctype, row.name, 'final_invoice_amount', null);

            
        } else {
            // Enable the fields if logistics_type is not "Delivered"
            grid_row.toggle_editable('charge_to_client', true);
            grid_row.toggle_editable('final_invoice_amount', true);
        }

        // Refresh the grid row to reflect the changes
        grid_row.refresh();
    }

    // Refresh the child table field to ensure changes are applied
    frm.refresh_field('logistics');
}


function toggle_charge_and_invoice_fields(frm, row) {
    // Ensure we are working with the correct child table fieldname
    let grid = frm.fields_dict['logistics'].grid;

    if (grid && grid.grid_rows_by_docname[row.name]) {
        let grid_row = grid.grid_rows_by_docname[row.name];
    
        console.log("row: ", row.logistics_type);
    
        // Condition to toggle fields based on logistics_type
        if (row.logistics_type === "Delivered") {
            console.log("Delivered selected");
    
            // Disable fields in the row
            grid_row.toggle_editable('charge_to_client', true);
            grid_row.toggle_editable('final_invoice_amount', true);
    
            // Set the values to null and disable the fields
            frappe.model.set_value(row.doctype, row.name, 'charge_to_client', null);
            frappe.model.set_value(row.doctype, row.name, 'final_invoice_amount', null);
    
            // Hide the fields
            grid_row.get_field('charge_to_client').$wrapper.hide();
            grid_row.get_field('final_invoice_amount').$wrapper.hide();
    
        } else {
            console.log("logistics_type is not 'Delivered'");
    
            // Enable the fields if logistics_type is not "Delivered"
            grid_row.toggle_editable('charge_to_client', true);
            grid_row.toggle_editable('final_invoice_amount', true);
    
            // Make sure the fields are visible again
            grid_row.get_field('charge_to_client').$wrapper.show();
            grid_row.get_field('final_invoice_amount').$wrapper.show();
        }
    
        // Refresh the grid row to reflect the changes
        grid_row.refresh();
    }
    

    // Refresh the child table field to ensure changes are applied
    frm.refresh_field('logistics');
}


