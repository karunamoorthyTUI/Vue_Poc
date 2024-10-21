# Copyright (c) 2024, Frappe Technologies and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class InventoryDetails(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.axe.doctype.inventory_detailschild.inventory_detailschild import InventoryDetailsChild
		from frappe.types import DF

		bin: DF.Link
		gross_weight: DF.Float
		inventory: DF.Link
		net_weight: DF.Float
		product_attribute: DF.Link
		sku: DF.Link
		table_bdug: DF.Table[InventoryDetailsChild]
		tare_weight: DF.Float
	# end: auto-generated types

	pass
