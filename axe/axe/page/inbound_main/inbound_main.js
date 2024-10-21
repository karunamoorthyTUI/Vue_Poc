frappe.pages['inbound_main'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Inbound Main',
        single_column: true
    });
 
    // // Create a container for the buttons and add the buttons above the cards
    // let button_container = $('<div class="button-row mt-3 col-10"></div>').appendTo(page.body);

    // // Create buttons and attach them to the page
    // page.add_inner_button('TRUCK', function() {
    //     // Get selected row data
    //     let selectedRows = $('.row-checkbox:checked');
        
    //     // If a row is selected
    //     if (selectedRows.length > 0) {
    //         // Assuming you want to get the first selected row's data
    //         let selectedRow = $(selectedRows[0]).closest('tr');
    //         let nameValue = selectedRow.find('td:nth-child(5)').text();
    //         let orderValue = selectedRow.find('td:nth-child(2)').text(); // Get Order value
    //         let scaleValue = selectedRow.find('td:nth-child(3)').text(); // Get Scale value
    //         let statusValue = selectedRow.find('td:nth-child(4)').text(); // Get Status value
            
    //         // Redirect to the TruckDemo form with the selected row's data
    //         frappe.set_route('Form', 'TruckDemo',nameValue);
    //     } else {
    //         // If no row is selected, redirect to TruckDemo Doctype form without any specific data
    //         frappe.set_route('Form', 'TruckDemo', 'new-TruckDemo');
    //     }
    // }).css('margin-right', '10px').appendTo(button_container);

    // page.add_inner_button('CHECK IN', function() {
    //     // frappe.msgprint('Button 2 clicked');
    //     // Add logic for Button 2
    // }).css('margin-right', '10px').appendTo(button_container);

    // page.add_inner_button('TRIAGE', function() {
    //     // frappe.msgprint('Button 3 clicked');
    //     // Add logic for Button 3
    // }).css('margin-right', '10px').appendTo(button_container);

    // page.add_inner_button('AUDIT', function() {
    //     // frappe.msgprint('Button 4 clicked');
    //     // Add logic for Button 4
    // }).css('margin-right', '10px').appendTo(button_container);

    // page.add_inner_button('UNIT TESTING', function() {
    //     // frappe.msgprint('Button 5 clicked');
    //     // Add logic for Button 5
    // }).css('margin-right', '10px').appendTo(button_container);

    // page.add_inner_button('PARTS HARVEST', function() {
    //     // frappe.msgprint('Button 6 clicked');
    //     // Add logic for Button 6
    // }).css('margin-right', '10px').appendTo(button_container);

    // page.add_inner_button('PARTS TESTING', function() {
    //     // frappe.msgprint('Button 7 clicked');
    //     // Add logic for Button 7
    // }).css('margin-right', '10px').appendTo(button_container);

    // // Create the card containers
    // let card_container = $('<div class="row mt-3 col-10"></div>').appendTo(page.body);

    // Card 1
    // let card1 = $('<div class="col-sm-6"><div class="card"><div class="card-body"><h5 class="card-title">Card 1</h5><p class="card-text">This is the content of card 1.</p><button class="btn btn-primary" id="card1-btn">Action 1</button></div></div></div>');
	// let card1 = $('<div class="col-sm-3"><div class="card"><div class="card-body"><h5 class="card-title">Total Accounts</h5><p id="accounts-count" class="card-text">Loading...</p></div></div></div>');
    // card1.appendTo(card_container);

    // Add click event to Card 1 to route to Accounts Doctype list
    // card1.click(function() {
    //     frappe.set_route('List', 'Crm_Account');
    // });

	// Fetch and display the count of Accounts
    // frappe.call({
    //     method: 'axe.axe.doctype.crm_account.crm_account.get_accounts_count',
    //     callback: function(r) {
    //         if (r.message) {
    //             $('#accounts-count').text(r.message);
    //         } else {
    //             $('#accounts-count').text('No data');
    //         }
    //     }
    // });

    // // Card 2
    // let card2 = $('<div class="col-sm-3"><div class="card"><div class="card-body"><h5 class="card-title">Total Locations</h5><p id="locations-count" class="card-text">Loading...</p></div></div></div>');
    // card2.appendTo(card_container);

    // // click panum  poothu route aaganum
    // card2.click(function() {
    //     frappe.set_route('List', 'locations');
    // });

	// // Fetch and display the count of Accounts
    // frappe.call({
    //     method: 'trial.trial.doctype.locations.locations.get_locations_count',
    //     callback: function(r) {
    //         if (r.message) {
	// 			console.log(r.message);				
    //             $('#locations-count').text(r.message);
    //         } else {
    //             $('#locations-count').text('No data');
    //         }
    //     }
    // });

    // // Add the Navbar between cards and grid
    // let navbar = $('<nav class="navbar navbar-expand-lg navbar-light bg-light mb-3 mt-3"></nav>').appendTo(page.body);
    // let navbarContent = $('<div class="container-fluid"></div>').appendTo(navbar);

    // // Navbar brand
    // $('<a class="navbar-brand" href="#">Inbound Management</a>').appendTo(navbarContent);

    // // Toggle button for mobile view
    // let toggleButton = $('<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>');
    // toggleButton.appendTo(navbarContent);

    // // Navbar links
    // let collapseDiv = $('<div class="collapse navbar-collapse" id="navbarNav"></div>').appendTo(navbarContent);
    // let navbarList = $('<ul class="navbar-nav"></ul>').appendTo(collapseDiv);

    // // Updated links in the navbar
    // $('<li class="nav-item"><a class="nav-link" >TRUCK</a></li>')
    //     .appendTo(navbarList)
    //     .click(function() {
    //         frappe.set_route('List', 'TruckDemo');
    //     });
    // $('<li class="nav-item"><a class="nav-link" >CHECK IN</a></li>').appendTo(navbarList);
    // $('<li class="nav-item"><a class="nav-link" >TRIAGE</a></li>').appendTo(navbarList);
    // $('<li class="nav-item"><a class="nav-link" >AUDIT</a></li>').appendTo(navbarList);
    // $('<li class="nav-item"><a class="nav-link" >UNIT TESTING</a></li>').appendTo(navbarList);
    // $('<li class="nav-item"><a class="nav-link" >PARTS HARVEST</a></li>').appendTo(navbarList);
    // $('<li class="nav-item"><a class="nav-link" >PARTS TESTING</a></li>').appendTo(navbarList);

    // // Add filter fields above the grid
    // let filterContainer = $('<div class="filter-container d-flex mb-3"></div>').appendTo(page.body);

    // // Create a filter for 'Order'
    // let orderFilter = $('<input type="text" class="form-control mr-2" placeholder="Filter by Order">').appendTo(filterContainer);

    // // Create a filter for 'Scale'
    // let scaleFilter = $('<input type="text" class="form-control mr-2" placeholder="Filter by Scale">').appendTo(filterContainer);

    // // Create a filter for 'Status'
    // let statusFilter = $('<input type="text" class="form-control mr-2" placeholder="Filter by Status">').appendTo(filterContainer);

    // // Create a filter button
    // let filterButton = $('<button class="btn btn-primary">Apply Filters</button>').appendTo(filterContainer);

    // // Create the grid container
    // let gridContainer = $('<div class="table-responsive mt-3"></div>').appendTo(page.body);
    // let gridTable = $('<table class="table table-striped"></table>').appendTo(gridContainer);

    // // Add table headers, including a checkbox column
    // let tableHeader = `
    //     <thead>
    //         <tr>
    //             <th><input type="checkbox" id="select-all"></th> <!-- Select all checkbox -->
    //             <th>ORDER ID</th>
    //             <th>SCALE</th>
    //             <th>STATUS</th>
    //             <th style="display:none;">Name</th>
    //         </tr>
    //     </thead>`;
    // gridTable.append(tableHeader);

    // // Fetch data from TruckDemo Doctype and update grid with checkboxes and filters
    // function fetchGridData() {
    //     // Get the filter values
    //     let orderValue = orderFilter.val();
    //     let scaleValue = scaleFilter.val();
    //     let statusValue = statusFilter.val();
    

    //     // Clear the existing table body
    //     gridTable.find('tbody').remove();

    //     // Fetch data from TruckDemo Doctype using frappe.call with filters
    //     frappe.call({
    //         method: 'frappe.client.get_list',
    //         args: {
    //             doctype: 'TruckDemo',
    //             filters: {
    //                 order: ['like', `%${orderValue}%`], // Apply filter for order field
    //                 scale: ['like', `%${scaleValue}%`], // Apply filter for scale field
    //                 status: ['like', `%${statusValue}%`] // Apply filter for status field
    //             },
    //             fields: ['order', 'scale', 'status', 'name'], // Customize fields as per your Doctype
    //             limit_page_length: 10 // Fetch first 10 records
    //         },
    //         callback: function(response) {
    //             let data = response.message;

    //             if (data && data.length > 0) {
    //                 let tableBody = $('<tbody></tbody>').appendTo(gridTable);

    //                 // Loop through the data and append rows with checkboxes to the table
    //                 data.forEach(function(row) {
    //                     let tableRow = `
    //                         <tr>
    //                             <td><input type="checkbox" class="row-checkbox"></td> <!-- Row-specific checkbox -->
    //                             <td>${row.order}</td>
    //                             <td>${row.scale}</td>
    //                             <td>${row.status}</td>
                                
    //                             <td style="display:none;">${row.name}</td>
    //                         </tr>`;
    //                     tableBody.append(tableRow);
    //                 });
    //             } else {
    //                 $('<tr><td colspan="4">No data found</td></tr>').appendTo(gridTable); // In case no data is returned
    //             }
    //         }
    //     });
    // }

    // // Call fetchGridData when the filter button is clicked
    // filterButton.click(function() {
    //     fetchGridData();
    // });

    // // Call fetchGridData on page load to load initial data without filters
    // fetchGridData();

    // // "Select All" functionality for checkboxes
    // $('#select-all').click(function() {
    //     let isChecked = $(this).is(':checked');
    //     $('.row-checkbox').prop('checked', isChecked);
    // });

    // // Add a button
    page.add_inner_button('New', function() {
        frappe.set_route('Form', 'Inbound Inquiry', 'new-Inbound Inquiry');
    });

    // // Add functionality for card buttons
    // $('#card1-btn').click(function() {
    //     frappe.msgprint('Action 1 for Card 1 clicked');
    // });
    
    // $('#card2-btn').click(function() {
    //     frappe.msgprint('Action 2 for Card 2 clicked');
    // });
}