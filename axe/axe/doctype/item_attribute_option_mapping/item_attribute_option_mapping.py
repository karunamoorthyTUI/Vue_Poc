# Copyright (c) 2024, admin and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ItemAttributeOptionMapping(Document):
    pass	

@frappe.whitelist()
def get_item_attribute_mapping(item):
    item_mapping = frappe.get_doc('Item Attribute Mapping', {'item': item})
    child_items = item_mapping.get('table_hvec') 
    selected_fields = []
    for child in child_items:
        selected_fields.append({
            "item_attribute":child.item_attribute
        })   

    return selected_fields

