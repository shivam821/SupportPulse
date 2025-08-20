
/**
 * Handles tab switching for user types and toggles the visibility of the admin field.
 * 
 * @param {HTMLElement} clickedTab - The tab element that was clicked.
 */
const tabs = document.querySelectorAll('.user-type');
const adminField = document.getElementById('admin-field');

function switchTab(clickedTab) {
    tabs.forEach(tab => tab.classList.remove('active'));
    clickedTab.classList.add('active');

    if (clickedTab.getAttribute('data-type') === "admin") {
        adminField.style.display = 'block';
    }
    else {
        adminField.style.display = 'none';
    }
}

tabs.forEach(tab => {
    tab.addEventListener('click', function () {
        switchTab(this);
    });
});