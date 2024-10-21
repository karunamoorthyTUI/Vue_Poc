// Copyright (c) 2024, admin and contributors
// For license information, please see license.txt

frappe.ui.form.on("PO Template Details", {
	refresh: function(frm) {
        console.log("check");
        
        // Initial check when the form is loaded
        toggle_table_editability(frm);
    },
    resale: function(frm) {
        // Trigger this function when the select field changes
        toggle_table_editability(frm);
    }
});


function toggle_table_editability(frm) {
    // Check the value of the select field
    if (frm.doc.resale == 'Allowed') {
        // Disable the table when 'allowed' is selected
        frm.fields_dict['resale_details'].grid.wrapper.find('.grid-body').css('pointer-events', 'none');
    } else if (frm.doc.resale == 'Credit') {
        // Enable the table when 'credit' is selected
        frm.fields_dict['resale_details'].grid.wrapper.find('.grid-body').css('pointer-events', 'auto');
    }
}