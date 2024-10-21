# Copyright (c) 2024, Crm and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
import frappe
from frappe import _


class LocationChild(Document):
	pass
# @frappe.whitelist(allow_guest=True)
# def get_contact_child(name):
# 		# Check if the user has read permission for the ContactChild doctype
# 		# if not frappe.has_permission(doctype="ContactChild", ptype="read"):
# 		# 	frappe.throw(_("You do not have permission to access this resource."), frappe.PermissionError)

# 		# Fetch the document if the user has the necessary permissions
# 		contact_child_doc = frappe.get_doc("ContactChild", name)
	
# 		# Check if the document exists
# 		if not contact_child_doc:
# 			frappe.throw(_("No ContactChild found with the name {0}").format(name))

# 		# Return the document or specific fields you want to expose
# 		return contact_child_doc

