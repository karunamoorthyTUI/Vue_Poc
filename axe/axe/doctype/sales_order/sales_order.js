// Copyright (c) 2024, BWH and contributors
// For license information, please see license.txt

frappe.ui.form.on("Sales Order", {
   onload: function(frm){
     
            // console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRr");
            
            // location_bind(frm);
            if (!frm.is_new()) {
                location_bind(frm);
            }
   
       },
    refresh: function(frm){
     
            // console.log("form is new......................");
            
            // location_bind(frm);
            // if (!frm.is_new()) {
            //     Load_location(frm)
            // }
   
        // frm.fields_dict['table_qcsb'].grid.wrapper.on('focus', 'input[data-fieldname="uid"]', function (e) {
        // //    console.log("GOT Clicked");
        //    let $row = $(e.target).closest('.grid-row');
        //    let row_doc = $row.data('doc');
        //    console.log("Selected Row ID:", row_doc.name);
        //    console.log("Selected SKU:", row_doc.sku);
        //    let selected_sku = row_doc.sku;
       
        // //    new frappe.ui.form.MultiSelectDialog({
        // //     doctype: "Inventory Details",
        // //     target: cur_frm,
        // //     setters: {
                
                 
        // //     },
        // //     add_filters_group: 1,
        // //     allow_child_item_selection:1,            
        // //     get_query() {
        // //         console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRr");
                
        // //         return {
        // //             filters: [
        // //                 ['Inventory Details', 'sku', 'like', selected_sku]  
        // //              ],
                
        // //         };
        // //     },
        // //     action(selections) {
        // //         console.log(selections);
                
        // //         cur_dialog.hide();
        // //     }
        // // });
           
        // new frappe.ui.form.MultiSelectDialog({
        //     doctype: "Inventory Details",
        //     target: cur_frm,
        //     setters: {               
        //         sku: '',
        //         bin:'',
                
        //     },
        //     add_filters_group: 1, 
        //     allow_child_item_selection: 1,
        //     child_fieldname: "uuid", 
        //     child_columns: ["item_code", "qty"],

                         
        //     get_query() {
        //         // console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRr");
                
        //         return {
        //             filters: [
        //                 ['Inventory Details', 'sku', 'like', selected_sku]  
        //              ],
                   
        //         };
        //     },
        //     action(selections) {
        //         console.log(selections);
                
        //         // selections.forEach(element => {

        //         //     if (element) {
        //         //             frappe.call({
        //         //                 method: 'frappe.client.get',
        //         //                 args: {
        //         //                     doctype: "Inventory Master",
        //         //                     filters: {
        //         //                         name: element

        //         //                     }
        //         //                 },
        //         //                 callback: function(val){
        //         //                     console.log("val", val);
                                    
        //         //                      if (val.message) {
        //         //                         console.log(val.message.stocked_as);
                                        
        //         //                          let child_row = frm.add_child('table_qcsb');
        //         //                          console.log("qqqqqqqqqqqqqq");
                                         
        //         //                         //  child_row.alt_view = val.message.status
        //         //                          child_row.sold_as = val.message.sold_as
        //         //                          child_row.sku = val.message.sku
        //         //                          child_row.product = val.message.stocked_as
        //         //                          child_row.quantity = val.message.available_quantity
        //         //                          child_row.price = val.message.item_cost + val.message.op_cost
        //         //                          child_row.uid = "View"
        //         //                         //  child_row.sku = `<a class="details-link" data-name="${element}">${val.message.account_name}</a>`; // Make product name clickable
        //         //                         //  child_row.uid = `<a class="details-link">view</a>`; 
        //         //                          frm.refresh_field('table_qcsb');
        //         //                      }
                                    
        //         //                 }
        //         //             })
        //         //     }                        
        //         // });
        //         // cur_dialog.hide();
        //     }
        // });
        
  
        // });


        // frm.fields_dict['table_qcsb'].grid.wrapper.off('focus', 'input[data-fieldname="sku"]').on('focus', 'input[data-fieldname="sku"]', function (e) {

        //     let $row = $(e.target).closest('.grid-row');
        //     let row_doc = $row.data('doc');
        //     console.log("Selected Row ID:", row_doc.name);
        //     console.log("Selected SKU:", row_doc.sku);
        //     let selected_sku = row_doc.sku;
        //     if (selected_sku) {
        //         frappe.call({
        //             method: 'frappe.client.get_list',
        //             args: {
        //                 doctype: 'Inventory Details',
        //                 filters: {
        //                     sku: selected_sku
        //                 },
        //                 fields: ['attributes']
        //             },
        //             callback: function (response) {
        //                 if (response.message) {
        //                     console.log(response.message);
        //                     response.message.forEach(function (attribute) {
        //                         console.log(attribute.attributes, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        //                         let itemAttribute = attribute.attributes;
        //                         if (itemAttribute != null) {
        
        //                             console.log(itemAttribute);
        //                             frappe.call({
        //                                 method: 'frappe.client.get',
        //                                 args: {
        //                                     doctype: 'Item Attribute Option Mapping',
        //                                     name: itemAttribute
        //                                 },
        //                                 callback: function (response) {
        //                                     console.log(response);       
                                           
        //                                     let grouped_attributes = {};
        //                                     response.message.table_cdix.forEach(function (child_row) {
        //                                         let item_name = child_row.item;
        //                                         if (!grouped_attributes[item_name]) {
        //                                             grouped_attributes[item_name] = [];
        //                                         }
        //                                         grouped_attributes[item_name].push(child_row);
        //                                     });
        
        //                                     let html_content = '<table class="table table-bordered">';
        //                                     html_content += `<thead>
        //                                                         <tr>
        //                                                             <th>Item</th>
        //                                                         </tr>
        //                                                     </thead>
        //                                                     <tbody>`;
        
                                           
        //                                     for (let item in grouped_attributes) {
        //                                         let attributes = grouped_attributes[item];
        
                                            
        //                                         html_content += `<tr class="collapsible-row" style="cursor: pointer;" data-toggle="collapse" data-target="#collapse-${item}">
        //                                                             <td colspan="2" style="font-weight: bold;">${item}</td>
        //                                                         </tr>`;
        
                                                
        //                                         html_content += `<tr id="collapse-${item}" class="collapse">
        //                                                             <td colspan="2">
        //                                                                 <table class="table table-sm table-striped">
        //                                                                     <thead>
        //                                                                         <tr>
        //                                                                             <th>Attribute</th>
        //                                                                             <th>Option</th>
        //                                                                         </tr>
        //                                                                     </thead>
        //                                                                     <tbody>`;
        
                                                
        //                                         attributes.forEach(function (child_row) {
        //                                             html_content += `<tr>
        //                                                                 <td>${child_row.attribute_name}</td>
        //                                                                 <td>${child_row.option}</td>
        //                                                             </tr>`;
        //                                         });
        
        //                                         html_content += `   </tbody>
        //                                                             </table>
        //                                                         </td>
        //                                                     </tr>`;
        //                                     }
        
        //                                     html_content += '</tbody></table>';
        
        //                                     let d = new frappe.ui.Dialog({
        //                                         title: 'Item Attributes',
        //                                         fields: [
        //                                             {
        //                                                 fieldtype: 'HTML',
        //                                                 fieldname: 'item_attribute'
        //                                             }
        //                                         ]
        //                                     });
        
        //                                     d.fields_dict.item_attribute.$wrapper.html(html_content);
        //                                     d.show();
        
                                          
        //                                     $('.collapsible-row').on('click', function () {
        //                                         console.log("ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
                                                
        //                                         let target = $(this).data('target');
        //                                         $(target).collapse('toggle');
        //                                     });
        //                                 }
        //                             });
        //                         }
        //                     });
        //                 }
        //             }
        //         });
        //     }
        // });

        frm.fields_dict['table_qcsb'].grid.wrapper.off('focus', 'input[data-fieldname="sku"]').on('focus', 'input[data-fieldname="sku"]', function (e) {

            // Get the row where the SKU is focused
            let $row = $(e.target).closest('.grid-row');
            let row_doc = $row.data('doc');
            console.log("Selected Row ID:", row_doc.name);
            console.log("Selected SKU:", row_doc.sku);
        
            let selected_sku = row_doc.sku;
            if (selected_sku) {
                // Fetch Inventory Details based on the selected SKU
                frappe.call({
                    method: 'frappe.client.get_list',
                    args: {
                        doctype: 'Inventory Details',
                        filters: { sku: selected_sku },
                        fields: ['attributes']
                    },
                    callback: function (response) {
                        if (response.message) {
                            response.message.forEach(function (attribute) {
                                console.log(attribute.attributes, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                                let itemAttribute = attribute.attributes;
        
                                if (itemAttribute) {
                                    // Fetch Item Attribute Option Mapping based on itemAttribute
                                    frappe.call({
                                        method: 'frappe.client.get',
                                        args: {
                                            doctype: 'Item Attribute Option Mapping',
                                            name: itemAttribute
                                        },
                                        callback: function (response) {
                                            console.log(response);
        
                                            let grouped_attributes = {};
                                            response.message.table_cdix.forEach(function (child_row) {
                                                let item_name = child_row.item;
                                                if (!grouped_attributes[item_name]) {
                                                    grouped_attributes[item_name] = [];
                                                }
                                                grouped_attributes[item_name].push(child_row);
                                            });
        
                                            // Build HTML content for the dialog
                                            let html_content = '<table class="table table-bordered">';
                                            html_content += `<thead>
                                                                <tr><th>Item</th></tr>
                                                             </thead>
                                                             <tbody>`;
        
                                            for (let item in grouped_attributes) {
                                                let attributes = grouped_attributes[item];
                                                // Sanitize item name for collapse id
                                                let sanitized_item = item.replace(/\s+/g, '_');
        
                                                // Collapsible row for the item
                                                html_content += `<tr class="collapsible-row" style="cursor: pointer;" data-toggle="collapse" data-target="#collapse-${sanitized_item}">
                                                                    <td colspan="2" style="font-weight: bold;">${item}</td>
                                                                 </tr>`;
        
                                                // Collapsed content for the item
                                                html_content += `<tr id="collapse-${sanitized_item}" class="collapse">
                                                                    <td colspan="2">
                                                                        <table class="table table-sm table-striped">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Attribute</th>
                                                                                    <th>Option</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>`;
        
                                                attributes.forEach(function (child_row) {
                                                    html_content += `<tr>
                                                                        <td>${child_row.attribute_name}</td>
                                                                        <td>${child_row.option}</td>
                                                                     </tr>`;
                                                });
        
                                                html_content += `       </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>`;
                                            }
        
                                            html_content += '</tbody></table>';
        
                                            // Create the dialog and insert HTML content
                                            let d = new frappe.ui.Dialog({
                                                title: 'Item Attributes',
                                                fields: [
                                                    { fieldtype: 'HTML', fieldname: 'item_attribute' }
                                                ]
                                            });
        
                                            d.fields_dict.item_attribute.$wrapper.html(html_content);
                                            d.show();
        
                                            // Collapsible toggle functionality
                                            $('.collapsible-row').on('click', function () {
                                                let target = $(this).data('target');
                                                $(target).collapse('toggle');
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
        
        

        
        
  
        frm.fields_dict['choose_product'].df.onchange = function(){
            let selected_product = frm.doc.choose_product
            // console.log("selected_product: ",selected_product);
        
            if (selected_product == "Resale") {
                
            // console.log("selected_productssssssssssssss: ",selected_product);
                
            new frappe.ui.form.MultiSelectDialog({
                doctype: "Inventory Master",
                target: cur_frm,
                setters: {
                    stocked_as: null,
                    sku: null,
                    
                },
                add_filters_group: 1,
              
                get_query() {
                    // console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRr");
                    
                    return {
                        filters: [
                            ['Inventory Master', 'inventory_type', 'like', selected_product]  // Filter out selected products
                         ],
                        //filters: { docstatus: ['=', 1] } // Adjust filters as needed
                    };
                },
                action(selections) {
                    console.log(selections);
                    
                    selections.forEach(element => {

                        if (element) {
                                frappe.call({
                                    method: 'frappe.client.get',
                                    args: {
                                        doctype: "Inventory Master",
                                        filters: {
                                            name: element

                                        }
                                    },
                                    callback: function(val){
                                        console.log("val", val);
                                        
                                         if (val.message) {
                                            console.log(val.message.stocked_as);
                                            
                                             let child_row = frm.add_child('table_qcsb');
                                             console.log("qqqqqqqqqqqqqq");
                                             
                                            //  child_row.alt_view = val.message.status
                                             child_row.sold_as = val.message.sold_as
                                             child_row.sku = val.message.sku
                                             child_row.product = val.message.stocked_as
                                             child_row.quantity = val.message.available_quantity
                                             child_row.price = val.message.item_cost + val.message.op_cost
                                             child_row.uid = "View"
                                            //  child_row.sku = `<a class="details-link" data-name="${element}">${val.message.account_name}</a>`; // Make product name clickable
                                            //  child_row.uid = `<a class="details-link">view</a>`; 
                                             frm.refresh_field('table_qcsb');
                                         }
                                        
                                    }
                                })
                        }                        
                    });
                    cur_dialog.hide();
                }
            });
        }
        else if (selected_product === "Scrap") {
            // console.log('*******************************');
            

            new frappe.ui.form.MultiSelectDialog({
                doctype: "Inventory Master",
                target: cur_frm,
                setters: {
                    stocked_as: null,
                    sku: null, // Ensure these fields exist in AxeProducts
                    // category: null       // or update them to valid fields
                },
                // child_fieldname: "AxeProducts", // child table fieldname, whose records will be shown &amp; can be filtered
                // child_columns: ["item_code", "qty"],
                get_query() {
                    return {
                        filters: [
                            ['Inventory Master', 'inventory_type', 'in', selected_product]  // Filter out selected products
                         ],                    };
                },
                action(selections) {
                    selections.forEach(element => {
                        if (element) {
                                frappe.call({
                                    method: 'frappe.client.get',
                                    args: {
                                        doctype: "Inventory Master",
                                        filters: {
                                            name: element
                                        }
                                    },
                                    callback: function(val){
                                        console.log("val", val);
                                        
                                         if (val.message) {
                                            console.log(val.message.item_name);
                                            
                                             let child_row = frm.add_child('table_qcsb');
                                             console.log("qqqqqqqqqqqqqq");
                                             
                                            //  child_row.alt_view = val.message.status
                                             child_row.sold_as = val.message.sold_as
                                             child_row.sku = val.message.sku
                                             child_row.product = val.message.stocked_as
                                             child_row.quantity = val.message.available_quantity
                                             child_row.price = val.message.item_cost + val.message.op_cost
                                             child_row.uid = "view"; // Make product name clickable
                                            
                                             frm.refresh_field('table_qcsb');
                                         }
                                        
                                    }
                                })
                        }                        
                    });
                    cur_dialog.hide();
                }
            }); 
        }
            
        }
    },
    

	account: function(frm) {
        console.log(frm.doc);
        
     
        if(frm.doc.account){
            location_bind(frm)

        }
    },




   
});
function location_bind(frm){ 
     
    const account_name = frm.doc.account;   

        // Call the server-side method to fetch locations
        frappe.call({
            method: 'axe.axe.doctype.accounts.accounts.get_selected_locations',
            args: {
                name: account_name
            },
            callback: function(response) {
                if (response.message) {
                    // Assuming response.message contains the locations
                    console.log(response.message);
                    // You can now do something with the locations, e.g., display them

                       // Assuming response.message contains an array of location values
                       const locations = response.message;

                       // Clear current options
                       frm.set_df_property('location', 'options', locations);
                    //    console.log("LLLLLLLLLLLL",locations);
                       locations.unshift("");
                       // Optionally, set the first location as the default selected value
                       if(!frm.doc.location && locations.length > 0){
                        frm.set_value('location', locations[1]);
                    }
                }
            }
        });
}



// frappe.ui.form.on('Sales Order Active Child',{
  
//     uid:function(frm,cdt,cdn){
        // console.log(frm);
        // console.log(cdn);
        // console.log(cdt);
        
        
        
//     }
// })


