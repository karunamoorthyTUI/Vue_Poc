# Copyright (c) 2024, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ItemAttributeMapping(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.axe.doctype.attribute_option_mapping.attribute_option_mapping import AttributeOptionMapping
		from frappe.types import DF

		attribute_name: DF.Link | None
		is_failed_: DF.Check
		is_passed_: DF.Check
		is_quantity_: DF.Check
		item: DF.Link | None
		table_hvec: DF.Table[AttributeOptionMapping]
	# end: auto-generated types

	pass
