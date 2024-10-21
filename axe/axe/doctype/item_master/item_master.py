# Copyright (c) 2024, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ItemMaster(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		data_bearing_item_: DF.Check
		inventory_type: DF.Link
		is_attribute_: DF.Check
		is_mixed_: DF.Check
		is_output_shred_product_: DF.Check
		is_parent_: DF.Check
		is_shred_product_: DF.Check
		is_unit_count_: DF.Check
		item_name: DF.Data
		item_type: DF.Data
		uom: DF.Link
	# end: auto-generated types

	pass
