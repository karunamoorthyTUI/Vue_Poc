# Copyright (c) 2024, Crm and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ContactChild(Document):
	def autoname(self):
		pass
        # Do nothing to prevent auto-generating a name
