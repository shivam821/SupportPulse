
// Ensure Supabase library is loaded before this script
const SUPABASE_URL = 'https://gumnirlcexdbfjhznivz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bW5pcmxjZXhkYmZqaHpuaXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMjYzNzAsImV4cCI6MjA3MDkwMjM3MH0.9v8koO0SCHOpPVrSCiLbq0QMsEbrkMKaiJ60w6Z-oz0';

// Initialize Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Menu Navigation
const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');
const sessionStorageusername = sessionStorage.getItem('Username');
const userNameEl = document.getElementById('userName');
if (userNameEl && sessionStorageusername) {
  userNameEl.textContent = sessionStorageusername;
}

userEmailid = sessionStorage.getItem('Email');

menuItems.forEach(item => {
  item.addEventListener('click', function() {
    menuItems.forEach(i => i.classList.remove('active'));
    pages.forEach(page => page.classList.remove('active'));
    this.classList.add('active');
    const pageId = this.getAttribute('data-page');
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');
  });
});

// Generate random ticket number
function generateRandom5DigitNumber() {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Form Elements
const formTicketnumber = generateRandom5DigitNumber();
const formInputsubject = document.getElementById('form-input-subject');
const formInputcustomeremail = document.getElementById('form-input-customer-email');
const formInputreportor = document.getElementById('form-input-reportor');
const formInputpriority = document.getElementById('form-input-priority');
const formInputtickettype = document.getElementById('form-input-ticket-type');
const formInputdescription = document.getElementById('form-input-description');
const ticketSubmission = document.getElementById('form-submit');
const formInputticketstatus = 'Open';
formInputreportor.value = sessionStorage.getItem('Email');

// Ticket Submission
if (ticketSubmission) {
  ticketSubmission.addEventListener('click', async (event) => {
    event.preventDefault();

    const { data, error } = await supabaseClient.from('tickets').insert([{
      ticket_number: formTicketnumber,
      subject: formInputsubject.value,
      customer_email: formInputcustomeremail.value,
      reporter: formInputreportor.value,
      ticket_priority: formInputpriority.value,
      ticket_type: formInputtickettype.value,
      ticket_description: formInputdescription.value,
      ticket_status: formInputticketstatus
    }]).select();

    if (error) {
      console.error(error);
      window.alert('Error in submitting!');
      return;
    }

    window.alert('Ticket Created!');

    if (formInputtickettype.value === 'Bug/Error') {
      const selectedUser = await randomUsers();
      if (selectedUser) {
        await supabaseClient.from('tickets')
          .update({ assigned_to: selectedUser.display_name })
          .eq('ticket_number', data[0].ticket_number);
      }
    }

    // Clear form
    formInputsubject.value = '';
    formInputcustomeremail.value = '';
    formInputreportor.value = '';
    formInputpriority.value = '';
    formInputtickettype.value = '';
    formInputdescription.value = '';
  });
}

// Fetch My Tickets
async function fetchMytickets() {
  const { data, error } = await supabaseClient.from("tickets").select("*").eq('reporter', sessionStorageusername);
  if (error) {
    console.log('Error in fetching my tickets.', error);
    return;
  }
  populateMytickets(data);
}

function populateMytickets(tickets) {
  const myTicketsbody = document.getElementById('myTicketsbody');
  if (!myTicketsbody) return;
  myTicketsbody.innerHTML = '';

  tickets.forEach(ticket => {
    const ticketElement = document.createElement('div');
    ticketElement.className = 'ticket-item';
    ticketElement.innerHTML = `
      <div class="ticket-info">
          <div class="ticket-number">#${ticket.ticket_number || 'No Ticket Number'}</div>
          <div class="ticket-subject">${ticket.subject || 'No subject'}</div>
          <div class="ticket-description">${ticket.ticket_description || 'No description'}</div>
      </div>
      <div class="ticket-status status-${ticket.ticket_status || 'open'}">
          ${ticket.ticket_status ? capitalizeFirstLetter(ticket.ticket_status) : 'Open'}
      </div>`;
    myTicketsbody.appendChild(ticketElement);
  });
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

fetchMytickets();

// Global ticket array for search
let allTickets = [];

async function fetchSearchtickets() {
  const { data, error } = await supabaseClient.from("tickets").select("*");
  if (error) {
    console.log('Error in fetching tickets.', error);
    return;
  }
  allTickets = data;
  populateSearchtickets(allTickets);
}

function populateSearchtickets(tickets) {
  const searchTicketbody = document.getElementById('searchTicketbody');
  if (!searchTicketbody) return;
  searchTicketbody.innerHTML = '';

  if (!tickets || tickets.length === 0) {
    searchTicketbody.innerHTML = '<p>No tickets found.</p>';
    return;
  }

  tickets.forEach(ticket => {
    const ticketElement = document.createElement('div');
    ticketElement.className = 'search-ticket-item';
    ticketElement.innerHTML = `
      <div class="ticket-info">
          <div class="ticket-number">#${ticket.ticket_number || 'No Ticket Number'}</div>
          <div class="ticket-subject">${ticket.subject || 'No subject'}</div>
          <div class="ticket-description">${ticket.ticket_description || 'No description'}</div>
      </div>
      <div class="ticket-status status-${ticket.ticket_status || 'open'}">
          ${ticket.ticket_status ? capitalizeFirstLetter(ticket.ticket_status) : 'Open'}
      </div>`;
    searchTicketbody.appendChild(ticketElement);
  });
}

const searchInput = document.querySelector('.search-ticket-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTickets = allTickets.filter(ticket =>
      (ticket.subject && ticket.subject.toLowerCase().includes(searchTerm)) ||
      (ticket.ticket_description && ticket.ticket_description.toLowerCase().includes(searchTerm)) ||
      (ticket.ticket_status && ticket.ticket_status.toLowerCase().includes(searchTerm))
    );
    populateSearchtickets(filteredTickets);
  });
}

fetchSearchtickets();

// Total ticket count
async function getTotalticketcount() {
  const { count, error } = await supabaseClient.from('tickets').select('*', { count: 'exact', head: true });
  if (error) {
    console.error('Error in count:', error);
    return null;
  }
  return count;
}

getTotalticketcount().then(count => {
  const el = document.getElementById('total-tickets');
  if (el && count !== null) el.textContent = count;
});

// Open ticket count
async function getTotalopenticketcount() {
  const { count, error } = await supabaseClient.from('tickets')
    .select('*', { count: 'exact', head: true })
    .eq('ticket_status', 'Open');
  if (error) {
    console.error('Error in count:', error);
    return null;
  }
  return count;
}

getTotalopenticketcount().then(count => {
  const el = document.getElementById('open-tickets');
  if (el && count !== null) el.textContent = count;
});

// Closed ticket count
async function getTotalcloseticketcount() {
  const { count, error } = await supabaseClient.from('tickets')
    .select('*', { count: 'exact', head: true })
    .eq('ticket_status', 'Closed');
  if (error) {
    console.error('Error in count:', error);
    return null;
  }
  return count;
}

getTotalcloseticketcount().then(count => {
  const el = document.getElementById('closed-tickets');
  if (el && count !== null) el.textContent = count;
});

// User creation
const formInputdisplayName = document.getElementById('form-input-displayName');
const formInputuseremail = document.getElementById('form-input-user-email');
const formInputuserpassword = document.getElementById('form-input-user-password');
const formInputusertype = document.getElementById('form-input-user-type');
const formSubmituser = document.getElementById('form-submit-user');

if (formSubmituser) {
  formSubmituser.addEventListener('click', async (e) => {
    e.preventDefault();
    const { error } = await supabaseClient.from('users').insert([{
      display_name: formInputdisplayName.value,
      email: formInputuseremail.value,
      passwords: formInputuserpassword.value,
      user_type: formInputusertype.value
    }]);
    if (error) {
      console.error(error);
      window.alert('Error creating user!');
      return;
    }
    window.alert('User Created!');
    formInputdisplayName.value = '';
    formInputuseremail.value = '';
    formInputuserpassword.value = '';
    formInputusertype.value = '';
  });
}

// Dropdown toggle
const userDropdownBtn = document.getElementById("userDropdownBtn");
if (userDropdownBtn) {
  userDropdownBtn.addEventListener("click", function() {
    const dropdown = this.parentElement;
    if (dropdown) dropdown.classList.toggle("show");
  });
}

// Random user assignment
async function randomUsers() {
  const { data: users, error } = await supabaseClient
    .from('agent_user_tickets')
    .select('display_name, ticket_count')
    .eq('ticket_type', 'Bug/Error')
    .order('ticket_count', { ascending: true });

  if (error || !users || users.length === 0) {
    console.error('Error fetching random users:', error);
    return null;
  }

  const lowestCount = users[0].ticket_count;
  const lowestUsers = users.filter(user => user.ticket_count === lowestCount);
  const selectedUser = lowestUsers[Math.floor(Math.random() * lowestUsers.length)];

  await supabaseClient
    .from('agent_user_tickets')
    .update({ ticket_count: selectedUser.ticket_count + 1 })
    .eq('display_name', selectedUser.display_name)
    .eq('ticket_type', 'Bug/Error');

  return selectedUser;
}