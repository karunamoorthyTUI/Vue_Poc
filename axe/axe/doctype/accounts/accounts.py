# Copyright (c) 2024, admin and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Accounts(Document):
	pass

@frappe.whitelist()
def get_selected_locations(name):
    account = frappe.get_doc("Accounts", name)
    return [loc.location for loc in account.location]


# @frappe.whitelist()
# def get_accounts_count():
#     return frappe.db.count('Accounts')

@frappe.whitelist()
def get_selected_contacts(name):
    account = frappe.get_doc("Location", name)
    return [con.contact for con in account.contact]


@frappe.whitelist()
def get_accounts_with_location_counts():
    accounts = frappe.get_all('Accounts', fields=['name', 'account_name'])
    for account in accounts:
        locations = frappe.get_all('Location Child', filters={'parent': account.name}, fields=['name'])
        account.location_count = len(locations) 
        print(accounts) 
    return accounts
