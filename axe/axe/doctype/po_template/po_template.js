frappe.ui.form.on("PO Template", {
    refresh: function(frm) {
        frm.fields_dict['link_product'].$input.off('click').on('click', function() {
            let selected_products = frm.doc.active_items.map(row => row.stocked_as);

            new frappe.ui.form.MultiSelectDialog({
                doctype: "Item Master",
                target: cur_frm,
                setters: {
                    item_name: null,
                    item_type: null,
                    uom: null
                },
                add_filters_group: 1,
                get_query() {
                    return {
                        filters: [
                            ['Item Master', 'name', 'not in', selected_products]
                        ]
                    };
                },
                action(selections) {
                    
                    frappe.call({
                        method: "frappe.client.get_list",  
                        args: {
                            doctype: "PO Template",
                            filters: {
                                name: frm.doc.template_name 
                            },
                            limit: 1 
                        },
                        callback: function(get_po_temp_res) {
                            let po_temp_doc;
                            
                            if (get_po_temp_res.message.length > 0) {
                                po_temp_doc = get_po_temp_res.message[0];
                                proceedWithDetails(po_temp_doc);
                            } else {
                                frappe.call({
                                    method: "frappe.client.insert",
                                    args: {
                                        doc: {
                                            doctype: "PO Template",
                                            template_name: frm.doc.template_name 
                                        }
                                    },
                                    callback: function(insert_po_temp_res) {
                                        if (insert_po_temp_res.message) {
                                            po_temp_doc = insert_po_temp_res.message;
                                            proceedWithDetails(po_temp_doc);
                                        } else {
                                            console.error("Failed to create PO Template:", insert_po_temp_res);
                                        }
                                    }
                                });
                            }

                            function proceedWithDetails(po_temp_doc) {
                            
                                const createDetailAndChild = async (element) => {
                                    
                                    try {
                                        const val = await frappe.call({
                                            method: 'frappe.client.get',
                                            args: {
                                                doctype: "Item Master",
                                                filters: {
                                                    name: element
                                                }
                                            }
                                        });
                            
                                        if (val.message) {
                                            const detail_res = await frappe.call({
                                                method: "frappe.client.insert",
                                                args: {
                                                    doc: {
                                                        doctype: "PO Template Details",
                                                        template_name: po_temp_doc.name,
                                                        stocked_as: val.message.name
                                                    }
                                                }
                                            });
                            
                                            if (detail_res.message) {
                                                let detail_doc = detail_res.message;

                                                const child_res = await frappe.call({
                                                    method: "frappe.client.insert",
                                                    args: {
                                                        doc: {
                                                            doctype: "PO Template Detail Child",
                                                            parent: po_temp_doc.name, 
                                                            parenttype: "PO Template", 
                                                            parentfield: "active_items", 
                                                            stocked_as: val.message.name,
                                                            bought_as: detail_doc.name 
                                                        }
                                                    }
                                                });
                            
                                                if (child_res.message) {
                            
                                                    frm.refresh_field('active_items');

                                                    const item_attributes = await frappe.call({
                                                        method: 'frappe.client.get',
                                                        args: {
                                                            doctype: 'Item Attribute Mapping',
                                                            filters: {
                                                                item: val.message.name
                                                            },
                                                        }
                                                    });

                                                    console.log(item_attributes,"IOT");
                                                    

                                                    if (item_attributes.message.table_hvec.length > 0) {
                                                        
                                                        // Prepare the child table rows for "PO Template Attribute"
                                                        const po_template_attribute_doc = {
                                                            doctype: "PO Template Attribute",
                                                            product_name: val.message.name,
                                                            attribute_details: []
                                                        };

                                                        

                                                        item_attributes.message.table_hvec.forEach((attribute) => {
                                                            
                                                            po_template_attribute_doc.attribute_details.push({
                                                                attribute_name: attribute.item_attribute
                                                            });
                                                        });
                                                        

                                                        // Insert the PO Template Attribute along with the child table
                                                        const po_attribute_value = await frappe.call({
                                                            method: 'frappe.client.insert',
                                                            args: {
                                                                doc: po_template_attribute_doc
                                                            }
                                                        });

                                                    
                            
                                                    // const po_attribute_value = await frappe.call({
                                                    //     method: 'frappe.client.insert',
                                                    //     args: {
                                                    //         doc: {
                                                    //             doctype: "PO Template Attribute",
                                                    //             product_name: val.message.name 
                                                    //         }
                                                    //     }
                                                    // });
                            
                                                    if (po_attribute_value.message) {
                                                        let po_attribute_doc = po_attribute_value.message;
                            
                                                        const att_child_res = await frappe.call({
                                                            method: "frappe.client.insert",
                                                            args: {
                                                                doc: {
                                                                    doctype: "PO Template Attribute Child",
                                                                    parent: detail_doc.name, 
                                                                    parenttype: "PO Template Details", 
                                                                    parentfield: "resale_details", 
                                                                    attribute_description: po_attribute_doc.name 
                                                                }
                                                            }
                                                        });
                            
                                                        if (att_child_res.message) {
                                                        } else {
                                                            console.error("Failed to create PO Template_att_child:", att_child_res);
                                                        }
                                                    }
                                                 }
                                                  else {
                                                        console.error("Failed to create PO Template_att:", po_attribute_value);
                                                    }
                                                } else {
                                                    console.error("Failed to create PO Template_detail_child:", child_res);
                                                }
                                            } else {
                                                console.error("Failed to create detail document:", detail_res);
                                            }
                                        }
                                    } catch (error) {
                                        console.error("Error in creating details and child: ", error);
                                    }
                                };
                            
                                const processSelections = async () => {
                                    for (const element of selections) {
                                        if (element) {
                                            await createDetailAndChild(element);
                                        }
                                    }
                                    cur_dialog.hide();
                                    frappe.set_route("form", "PO Template", po_temp_doc.name);
                                };
                            
                                processSelections();
                            }
                            
                        }
                    });
                }
            });
        });
    }
});
