// Copyright (c) 2024, Frappe Technologies and contributors
// For license information, please see license.txt

// frappe.ui.form.on("UID Master", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on('UID Master', {
    onload: function(frm) {
        if (!frm.doc.date) {  
            frm.set_value('date', frappe.datetime.nowdate());
        }
    }
});