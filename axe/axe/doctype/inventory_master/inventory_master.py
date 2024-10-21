# Copyright (c) 2024, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class InventoryMaster(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		available_quantity: DF.Int
		available_weight: DF.Int
		inventory_type: DF.Link
		item_cost: DF.Currency
		item_name: DF.Link
		op_cost: DF.Currency
		sku: DF.Link
		total_quantity: DF.Int
		total_weight: DF.Int
	# end: auto-generated types

	pass
