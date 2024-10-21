// Copyright (c) 2024, Crm and contributors
// For license information, please see license.txt


frappe.ui.form.on('Contacts', {
    onload: function (frm) {
        if (!frm.is_new()) {
            frm.toggle_display('loc_card', true);   
            frm.toggle_display('notification_card', true);
        }
        Contacts_card(frm)
  },
    refresh: function (frm) {
      Contacts_card(frm)
  }                                                         
});

function Contacts_card(frm) {   
    const card_html = `
    <div class="Loc-card" style="
       ${getCardStyle()}
        ">
        <h3>Locations</h3>
        <div id="location-count" style="font-size: 36px; font-weight: bold;"> Loading...</div>
    </div>
`;
    const notification_html = `
    <div class="notification-card" style="
    ${getCardStyle()}
        ">
        <h3>Notifications</h3>
        <div id="notification-count" style="font-size: 36px; font-weight: bold;"> Loading...</div>
    </div>
    `;
    frm.fields_dict.loc_card.$wrapper.html(card_html);
    frm.fields_dict.notification_card.$wrapper.html(notification_html);
    observeThemeChanges('Loc-card');
    observeThemeChanges('notification-card');


    $('#notification-count').text(0);
  
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Location',
            filters: [
                ['Contact Child', 'contact', '=', frm.doc.name]
            ],
            fields: ['name'],
        },
        callback: function (response) {
            let count = response.message.length;
            $('#location-count').text(count);
        },
        
    });
   
    if (frm.doc.name) {
        frm.fields_dict.loc_card.$wrapper.find('.Loc-card').on('click', function () {
            frappe.set_route('Form', 'Location', {contact:frm.doc.name});
        }); 
    }   
   
    frm.fields_dict.notification_card.$wrapper.find('.notification-card').on('click', function () {
        frm.toggle_display('notification_table', true);
    });
}