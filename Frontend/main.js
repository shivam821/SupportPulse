

/**
 * Supabase client initialization for interacting with the backend database.
 * @constant {string} SUPABASE_URL - The Supabase project URL.
 * @constant {string} SUPABASE_ANON_KEY - The Supabase anonymous API key.
 * @constant {object} supabase - The Supabase client instance.
 */

/**
 * Handles menu item click events to switch active page and menu item.
 * Removes 'active' class from all menu items and pages, then adds it to the clicked item and corresponding page.
 */

/**
 * Handles ticket submission form.
 * Inserts a new ticket into the 'tickets' table in Supabase.
 * Clears form fields after successful submission.
 * @event click
 * @param {Event} event - The click event object.
 */

/**
 * Fetches all tickets from Supabase and populates the "My Tickets" section.
 * @async
 * @function fetchMytickets
 */

/**
 * Populates the "My Tickets" section with ticket data.
 * @function populateMytickets
 * @param {Array<Object>} tickets - Array of ticket objects.
 */

/**
 * Capitalizes the first letter of a string.
 * @function capitalizeFirstLetter
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */

/**
 * Fetches all tickets from Supabase and populates the "Search Tickets" section.
 * @async
 * @function fetchSearchtickets
 */

/**
 * Populates the "Search Tickets" section with ticket data.
 * @function populateSearchtickets
 * @param {Array<Object>} tickets - Array of ticket objects.
 */

/**
 * Gets the total count of tickets from Supabase.
 * @async
 * @function getTotalticketcount
 * @returns {Promise<number|null>} - The total ticket count or null if error.
 */

/**
 * Gets the total count of open tickets from Supabase.
 * @async
 * @function getTotalopenticketcount
 * @returns {Promise<number|null>} - The count of open tickets or null if error.
 */

/**
 * Gets the total count of closed tickets from Supabase.
 * @async
 * @function getTotalcloseticketcount
 * @returns {Promise<number|null>} - The count of closed tickets or null if error.
 */
// Ensure Supabase library is loaded before this script
const SUPABASE_URL = 'https://gumnirlcexdbfjhznivz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bW5pcmxjZXhkYmZqaHpuaXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMjYzNzAsImV4cCI6MjA3MDkwMjM3MH0.9v8koO0SCHOpPVrSCiLbq0QMsEbrkMKaiJ60w6Z-oz0';

// Initialize Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');

// Handle menu item clicks
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all menu items and pages
        menuItems.forEach(i => i.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));
        
        // Add active class to clicked menu item
        this.classList.add('active');
        
        // Show corresponding page
        const pageId = this.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
    });
});

const formInputsubject = document.getElementById('form-input-subject');
const formInputcustomeremail = document.getElementById('form-input-customer-email');
const formInputreportor = document.getElementById('form-input-reportor');
const formInputpriority = document.getElementById('form-input-priority');
const formInputtickettype = document.getElementById('form-input-ticket-type');
const formInputdescription = document.getElementById('form-input-description');
const formInputticketstatus = 'Open';
const ticketSubmission = document.getElementById('form-submit');
ticketSubmission.addEventListener('click', async (event) => {
    event.preventDefault();
    
    // Use the supabase client you initialized above, not window.supabase directly
    const { data, error } = await supabase.from('tickets').insert([{
        subject: formInputsubject.value,
        customer_email: formInputcustomeremail.value,
        reporter : formInputreportor.value,
        ticket_priority: formInputpriority.value,
        ticket_type: formInputtickettype.value,
        ticket_description: formInputdescription.value,
        ticket_status : formInputticketstatus
    }]);

    if (error) {
        console.error(error);
        window.alert('Error in submitting!');
    } else {
        window.alert('Ticket Created!');
    }
    
    // Clear form fields
    formInputsubject.value = "";
    formInputcustomeremail.value = "";
    formInputreportor.value = "";
    formInputpriority.value = "";
    formInputtickettype.value = "";
    formInputdescription.value = "";
});

//My Tickets
async function fetchMytickets() {
    const { data, error } = await supabase.from("tickets").select("*");
    if (error) {
        console.log('Error in fetching jobs.');
        return; // Added return to prevent using undefined 'data' when error occurs
    }
    populateMytickets(data);
}

function populateMytickets(tickets) {
    const myTicketsbody = document.getElementById('myTicketsbody');
    myTicketsbody.innerHTML = '';

    tickets.forEach((ticket) => {
        // Create the HTML element for each ticket
        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket-item';
        ticketElement.innerHTML = `
            <div class="ticket-info">
                <div class="ticket-subject">${ticket.subject || 'No subject'}</div>
                <div class="ticket-description"> 
                    ${ticket.ticket_description || 'No description'}
                </div>
            </div>
            <div class="ticket-status status-${ticket.ticket_status || 'open'}">
                ${ticket.ticket_status ? capitalizeFirstLetter(ticket.ticket_status) : 'Open'}
            </div>
        `;
        
        // Append the ticket to the container
        myTicketsbody.appendChild(ticketElement);
    });
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

fetchMytickets();



//Search Tickets
async function fetchSearchtickets() {
    const { data, error } = await supabase.from("tickets").select("*");
    if (error) {
        console.log('Error in fetching jobs.');
        return; // Added return to prevent using undefined 'data' when error occurs
    }
    populateSearchtickets(data);
}

function populateSearchtickets(tickets) {
    const searchTicketbody = document.getElementById('searchTicketbody');
    searchTicketbody.innerHTML = '';

    tickets.forEach((ticket) => {
        // Create the HTML element for each ticket
        const ticketElement = document.createElement('div');
        ticketElement.className = 'search-ticket-item';
        ticketElement.innerHTML = `
            <div class="search-ticket-info">
                <div class="ticket-subject">${ticket.subject || 'No subject'}</div>
                <div class="ticket-description"> 
                    ${ticket.ticket_description || 'No description'}
                </div>
            </div>
            <div class="search-ticket-status status-${ticket.ticket_status || 'open'}">
                ${ticket.ticket_status ? capitalizeFirstLetter(ticket.ticket_status) : 'Open'}
            </div>
        `;
        
        // Append the ticket to the container
        searchTicketbody.appendChild(ticketElement);
    });
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

fetchSearchtickets();



//Total Tickets
getTotalticketcount().then(count => {
    if (count !== null) {
        document.getElementById('total-tickets').textContent = count;
    }
});


async function getTotalticketcount() {
    const { count, error } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error in count:', error);
        return null;
    } else {
        // console.log('Total tickets:', count);
        return count;
    }
}

//Open Tickets
getTotalopenticketcount().then(count => {
    if (count !== null) {
        document.getElementById('open-tickets').textContent = count;
    }
});


async function getTotalopenticketcount() {
    const { count, error } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true }).eq('ticket_status', 'Open');

    if (error) {
        console.error('Error in count:', error);
        return null;
    } else {
        return count;
    }
}

//Closed Tickets
getTotalcloseticketcount().then(count => {
    if (count !== null) {
        document.getElementById('closed-tickets').textContent = count;
    }
});


async function getTotalcloseticketcount() {
    const { count, error } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true }).eq('ticket_status', 'Closed');

    if (error) {
        console.error('Error in count:', error);
        return null;
    } else {
        return count;
    }
}