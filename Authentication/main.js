/**
 * Handles user login by validating credentials against the Supabase 'users' table.
 * On successful authentication, routes the user based on their user type.
 * Displays alerts for both successful and failed login attempts.
 *
 * @event click
 * @param {Event} e - The click event triggered by the login button.
 * @returns {Promise<void>}
 */
// Ensure Supabase library is loaded before this script
const SUPABASE_URL = 'https://gumnirlcexdbfjhznivz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bW5pcmxjZXhkYmZqaHpuaXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMjYzNzAsImV4cCI6MjA3MDkwMjM3MH0.9v8koO0SCHOpPVrSCiLbq0QMsEbrkMKaiJ60w6Z-oz0';

// Initialize Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const tabs = document.querySelectorAll('.user-type');
const adminField = document.getElementById('admin-field');

const formInputemail = document.getElementById('login-email');
const formInputpassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click',async(e)=>{
    e.preventDefault();
    console.log(formInputemail.value);
    console.log(formInputpassword.value);
    
    const {data,error} = await supabase
    .from ('users')
    .select('*')
    .eq('email',formInputemail.value)
    .eq('passwords',formInputpassword.value)
    .single()

    if (error) {
        window.alert('Invalid Credentials');
    }
    else {
        window.alert('Login Successful');
        if (data.user_type == 'admin') {
            // Route to admin page
            // window.location.href = 'dashboard.html';
        }
        else if (data.user_type == 'agent') {
            // Route to support Agent page
        }
        else if (data.user_type == 'customer'){
            // Route to customer page
        }
        else {
            // Invalid
        }
        // window.location.href = 'dashboard.html'; // Redirect to dashboard
    }

});





