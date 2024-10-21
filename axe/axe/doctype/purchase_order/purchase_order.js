// Copyright (c) 2024, admin and contributors
// For license information, please see license.txt

frappe.ui.form.on("Purchase Order", {
    onload: function (frm) {
        if (!frm.doc.effective_date) {
            frm.set_value('effective_date', frappe.datetime.nowdate());
        }
        if (!frm.is_new()) {
            Load_location(frm)
        }
    },
    refresh:function(frm){
        if (frm.doc.account) {
            Load_location(frm)
        }
    },    
    load_from_template: function (frm) {
        frm.fields_dict['load_from_template'].df.onchange = async function () {
            const selectedValue = frm.doc.load_from_template;

            // Fetch PO Template Details based on the selected template name
            const templateDetails = await getTemplateDetails(selectedValue);
            if (!templateDetails) {
                return;
            }

            const dialog = new frappe.ui.form.MultiSelectDialog({
                doctype: "PO Template Details",
                target: frm,
                setters: {
                    stocked_as: null,
                    uom: null,
                    price: null
                },
                add_filters_group: 1,
                get_query() {
                    return {
                        filters: [
                            ['PO Template Details', 'template_name', '=', selectedValue]
                        ]
                    };
                },
                action: async (selections) => {
                    let poTempDoc = await getPurchaseOrder(frm.doc.name);
                    
                    if (!poTempDoc) {
                        poTempDoc = await createPurchaseOrder(frm);
                    }

                    await processTemplateSelections(selections, poTempDoc);
                    cur_dialog.hide();
                    frappe.set_route("form", "Purchase Order", poTempDoc.name);
                    frm.refresh_field('active_items');
                    location.reload()
                   

                }
            });

            // Reset the load_from_template field
            frm.doc.load_from_template = null;
            frm.refresh_field('load_from_template');
        };
    },

    load_from_products: function (frm) {
        let selectedProducts = frm.doc.active_items.map(row => row.stocked_as);

        const dialog = new frappe.ui.form.MultiSelectDialog({
            doctype: "Item Master",
            target: frm,
            setters: {
                item_name: null,
                item_type: null,
                uom: null
            },
            add_filters_group: 1,
            get_query() {
                return {
                    filters: [
                        ['Item Master', 'name', 'not in', selectedProducts]
                    ]
                };
            },
            action: async (selections) => {
                let poTempDoc = await getPurchaseOrder(frm.doc.name);
                
                if (!poTempDoc) {
                    poTempDoc = await createPurchaseOrder(frm);
                }

                await processProductSelections(selections, poTempDoc);
                cur_dialog.hide();
                frappe.set_route("form", "Purchase Order", poTempDoc.name);
            }
        });
    },
    account: function (frm) {
        if (frm.doc.account) {
            Load_location(frm)
        }
        
       
    },  
});


async function getTemplateDetails(selectedValue) {
    const response = await frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "PO Template Details",
            filters: {
                template_name: selectedValue
            },
            limit: 1
        }
    });

    return response.message && response.message.length > 0 ? response.message[0] : null;
}

    async function Load_location(frm){
        const account_name = frm.doc.account;

        frappe.call({
            method: 'axe.axe.doctype.accounts.accounts.get_selected_locations',
            args: {
                name: account_name
            },
            callback: function (response) {
                if (response.message) {
                    const locations = response.message;
                    frm.set_df_property('location', 'options', locations);
                    // frm.set_df_property('reveiving_facilities', 'options', locations);
                    locations.unshift("");
                    if(!frm.doc.location && locations.length > 0){
                        frm.set_value('location', locations[1]);
                        // frm.set_value('reveiving_facilities', "test")
                    }
                }
            }
        });
    }

// Function to get the Purchase Order
async function getPurchaseOrder(poName) {
    const response = await frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "Purchase Order",
            filters: {
                name: poName
            },
            limit: 1
        }
    });
    
    return response.message && response.message.length > 0 ? response.message[0] : null;
}

// Function to create a new Purchase Order
async function createPurchaseOrder(frm) {
    const poData = {
        doctype: "Purchase Order",
        template_name: frm.doc.template_name,
        account: frm.doc.account,
        effective_date: frm.doc.effective_date,
        reveiving_facilities: frm.doc.reveiving_facilities,
        location: frm.doc.location,
        expiration_date: frm.doc.expiration_date,
        client_referral: frm.doc.client_referral,
        sales: frm.doc.sales,
        incoterms: frm.doc.incoterms,
        po_tags: frm.doc.po_tags,
        csr: frm.doc.csr,
        payment_terms: frm.doc.payment_terms,
        order_alert: frm.doc.order_alert,
        notes: frm.doc.notes
    };

    const response = await frappe.call({
        method: "frappe.client.insert",
        args: {
            doc: poData
        }
    });

    return response.message || null;
}

// Function to process selected template details
async function processTemplateSelections(selections, poTempDoc) {
    for (const element of selections) {
        if (element) {
            await createTemplateDetailAndChild(element, poTempDoc);
        }
    }
}

// Function to create details and child records for templates
async function createTemplateDetailAndChild(element, poTempDoc) {
    try {
        const templateDetail = await getTemplateDetailByName(element);
        if (!templateDetail) return;

        const detailRes = await createPurchaseOrderDetail(templateDetail);
        if (!detailRes) return;

        const childRes = await createPurchaseOrderDetailChild(detailRes.name, poTempDoc.name, templateDetail.stocked_as);
        if (!childRes) return;

        await handleResaleDetails(templateDetail.resale_details, detailRes.name);
    } catch (error) {
        console.error("Error in creating template details and child: ", error);
    }
}

// Function to get a template detail by name
async function getTemplateDetailByName(name) {
    const response = await frappe.call({
        method: 'frappe.client.get',
        args: {
            doctype: "PO Template Details",
            filters: { name }
        }
    });

    return response.message || null;
}

// Function to create a Purchase Order Detail
async function createPurchaseOrderDetail(templateDetail) {
    const detailData = {
        doctype: "Purchase Order Details",
        template_name: templateDetail.template_name,
        stocked_as: templateDetail.stocked_as,
        uom: templateDetail.uom,
        price: templateDetail.price,
        quantity: templateDetail.quantity,
        restrict_quantity: templateDetail.restrict_quantity,
        restrict_uom: templateDetail.restrict_uom,
        restriction_min: templateDetail.restriction_min,
        restriction_max: templateDetail.restriction_max,
        resale: templateDetail.resale,
        all_inclusive: templateDetail.all_inclusive,
        inclusive_price: templateDetail.inclusive_price,
        secure: templateDetail.secure,
        secure_price: templateDetail.secure_price,
    };

    const response = await frappe.call({
        method: "frappe.client.insert",
        args: { doc: detailData }
    });

    return response.message || null;
}

// Function to create a Purchase Order Detail Child
async function createPurchaseOrderDetailChild(detailName, parentName, stockedAs) {
    const childData = {
        doctype: "Purchase Order Details Child",
        parent: parentName,
        parenttype: "Purchase Order",
        parentfield: "active_items",
        bought_as: stockedAs,
        stocked_as: detailName
    };

    const response = await frappe.call({
        method: "frappe.client.insert",
        args: { doc: childData }
    });

    return response.message || null;
}

// Function to handle resale details for template
async function handleResaleDetails(resaleDetails, detailName) {
    if (resaleDetails.length === 0) return;

    for (const value of resaleDetails) {
        const attributeData = await getAttributeData(value.attribute_description);
        if (!attributeData) continue;

        const poAttributeDoc = await createPurchaseOrderAttribute(attributeData);
        if (!poAttributeDoc) continue;

        await createPurchaseOrderTemplateChild(detailName, poAttributeDoc.name);
    }
}

// Function to get attribute data
async function getAttributeData(attributeName) {
    const response = await frappe.call({
        method: 'frappe.client.get',
        args: {
            doctype: 'PO Template Attribute',
            filters: { name: attributeName },
        }
    });

    return response.message || null;
}

// Function to create a Purchase Order Attribute
async function createPurchaseOrderAttribute(attributeData) {
    const attributeDoc = {
        doctype: "Purchase Order Attribute",
        product_name: attributeData.product_name,
        description: attributeData.description,
        type: attributeData.type,
        fmv_percentage: attributeData.fmv_percentage,
        min_fmv: attributeData.min_fmv,
        price: attributeData.price,
        quantity: attributeData.quantity,
        min_quantity: attributeData.min_quantity,
        max_quantity: attributeData.max_quantity,
        restrict_quantity: attributeData.restrict_quantity,
        attribute_details: attributeData.attribute_details.map(attr => ({
            attribute_name: attr.attribute_name,
            bought: attr.bought,
            condition: attr.condition,
            specification: attr.specification
        }))
    };

    const response = await frappe.call({
        method: 'frappe.client.insert',
        args: { doc: attributeDoc }
    });

    return response.message || null;
}

// Function to create a Purchase Order Template Child
async function createPurchaseOrderTemplateChild(detailName, attributeName) {
    const childData = {
        doctype: "Purchase Order Template Child",
        parent: detailName,
        parenttype: "Purchase Order Details",
        parentfield: "resale_details",
        attribute_description: attributeName
    };

    const response = await frappe.call({
        method: "frappe.client.insert",
        args: { doc: childData }
    });

    return response.message || null;
}

// Function to process selected products
async function processProductSelections(selections, poTempDoc) {
    for (const element of selections) {
        if (element) {
            await createProductDetailAndChild(element, poTempDoc);
        }
    }
}

// Function to create details and child records for products
async function createProductDetailAndChild(element, poTempDoc) {
    try {
        const itemData = await getItemData(element);
        if (!itemData) return;

        const detailRes = await createPurchaseOrderDetail({
            stocked_as: itemData.name
        });

        if (!detailRes) return;

        const childRes = await createPurchaseOrderDetailChild(detailRes.name, poTempDoc.name, itemData.name);
        if (!childRes) return;

        await handleProductAttributes(itemData.name, detailRes.name);
    } catch (error) {
        console.error("Error in creating product details and child: ", error);
    }
}

// Function to get item data by name
async function getItemData(name) {
    const response = await frappe.call({
        method: 'frappe.client.get',
        args: {
            doctype: "Item Master",
            filters: { name }
        }
    });

    return response.message || null;
}

// Function to handle product attributes
async function handleProductAttributes(itemName, detailName) {
    const itemAttributes = await getItemAttributes(itemName);
    console.log("itemAttributes: ", itemAttributes);
    
    if (!itemAttributes || itemAttributes.length === 0) return;

    const poTemplateAttributeDoc = {
        doctype: "Purchase Order Attribute",
        product_name: itemName,
        attribute_details: itemAttributes.table_hvec.map(attr => ({
            attribute_name: attr.item_attribute
        }))
    };

    const poAttributeValue = await createPurchaseOrderAttribute(poTemplateAttributeDoc);
    if (!poAttributeValue) return;

    await createPurchaseOrderTemplateChild(detailName, poAttributeValue.name);
}

// Function to get item attributes
async function getItemAttributes(itemName) {
    const response = await frappe.call({
        method: 'frappe.client.get',
        args: {
            doctype: 'Item Attribute Mapping',
            filters: { item: itemName },
            // fields: ['item_attribute']
        }
    });

    return response.message || [];
}

