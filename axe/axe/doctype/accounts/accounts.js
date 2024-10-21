// Copyright (c) 2024, admin and contributors
// For license information, please see license.tx


frappe.ui.form.on('Location Child', {
    location_add: function (frm, cdt, cdn) {
        // console.log(" location add clicked............");
        set_location_filter(frm); 
        // update_contact_table(frm);
    },

    location_remove: function (frm) {
        // console.log(" location delete clicked............");
        // update_contact_table(frm);
        set_location_filter(frm);
    }
});

// function update_contact_table(frm) {
//     frm.clear_table('contact');

//     if (frm.doc.location && frm.doc.location.length > 0) {
//         frm.doc.location.forEach(function (location_row) {
//             if (location_row.location) {
//                 frappe.call({
//                     method: 'frappe.client.get',
//                     args: {
//                         doctype: 'Locations',
//                         name: location_row.location
//                     },
//                     callback: function (r) {
//                         if (r.message.contact) {
//                             var location_doc = r.message;

//                             if (location_doc.contact) {
//                                 location_doc.contact.forEach(function (contact_row) {
//                                     // if (!existing_contacts.includes(contact_row.contact)) {
//                                         var child_row = frm.add_child('contact');
//                                         child_row.contact = contact_row.contact+ " (" + location_row.location + ")";
//                                     // }
//                                 });
//                                 frm.refresh_field('contact');
//                             } else {
//                                 frappe.msgprint('No contacts found for location: ' + location_row.location);
//                             }
//                         }
//                     }
//                 });
//             }
//         });
//     } else {
//         // frm.clear_table('contact');
//         frm.refresh_field('contact');
//         console.log("No locations available in the location table.");
//     }
// }

function set_location_filter(frm) {
    frm.fields_dict['location'].grid.get_field('location').get_query = function (doc, cdt, cdn) {
      
        let selected_locations = frm.doc.location.map(function (row) {
            return row.location;
        });
        return {
            filters: [
                ['Location', 'name', 'not in', selected_locations]
            ]
        };
    };
}
