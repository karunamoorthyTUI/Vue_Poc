frappe.ui.form.on("Inbound Logistics", {
    refresh(frm) {
        // Initial check on form load
        // toggle_charge_and_invoice_fields(frm);
    },
    // logistics_type: function(frm) {
    //     // When the logistics_type field is changed
    //     toggle_charge_and_invoice_fields(frm);
    // }
});

// function toggle_charge_and_invoice_fields(frm) {
//     console.log(frm.doc)
//     if (frm.doc.logistics_type === "Delivered") {
//         // Disable the "Charge to Client" and "Final Invoice Amount" fields
//         frm.set_df_property('charge_to_client', 'read_only', 1);
//         frm.set_df_property('final_invoice_amount', 'read_only', 1);
//     } else {
//         // Enable the fields if "Delivered" is not selected
//         frm.set_df_property('charge_to_client', 'read_only', 0);
//         frm.set_df_property('final_invoice_amount', 'read_only', 0);
//     }
//     // Refresh the fields to apply the changes
//     frm.refresh_field('charge_to_client');
//     frm.refresh_field('final_invoice_amount');
// }
