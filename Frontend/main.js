document.addEventListener('DOMContentLoaded', function() {
    // SPA Navigation
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
    
    // Form submission for create ticket
    const ticketForm = document.querySelector('.ticket-form');
    if (ticketForm) {
        ticketForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Ticket created successfully!');
            // Reset form
            this.reset();
            // In a real app: send data to server then redirect
            document.querySelector('.menu-item[data-page="my-tickets"]').click();
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const ticketItems = document.querySelectorAll('.ticket-item');
            
            ticketItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
            });
        });
    }

    // Mock data updates (replace with real API calls)
    setInterval(() => {
        document.getElementById('total-tickets').textContent = 
            Math.floor(Math.random() * 10) + 20;
        document.getElementById('open-tickets').textContent = 
            Math.floor(Math.random() * 5) + 5;
    }, 5000);
});