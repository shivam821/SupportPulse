// Ensure Supabase library is loaded before this script
const SUPABASE_URL = 'https://gumnirlcexdbfjhznivz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1bW5pcmxjZXhkYmZqaHpuaXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMjYzNzAsImV4cCI6MjA3MDkwMjM3MH0.9v8koO0SCHOpPVrSCiLbq0QMsEbrkMKaiJ60w6Z-oz0';

// Initialize Supabase
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const tabs = document.querySelectorAll('.user-type');
const adminField = document.getElementById('admin-field');

const formInputemail = document.getElementById('login-email');
const formInputpassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click',async(e)=>{
    e.preventDefault();
    console.log(formInputemail.value);
    console.log(formInputpassword.value);
    
    const {data,error} = await supabaseClient
    .from ('users')
    .select('*')
    .eq('email',formInputemail.value)
    .eq('passwords',formInputpassword.value)
    .single()

    if (error) {
        window.alert('Invalid Credentials');
    }
    else {
    if (data.user_type === 'Administrator') {
        const formInputemail_trim = formInputemail.value.split('@')[0];
        window.alert(`Successful Login as ${formInputemail_trim}`);
        window.location.href = 'admin_user_frontend.html';
        console.log(formInputemail_trim);
        sessionStorage.setItem('Username',formInputemail_trim);
        sessionStorage.setItem('Email',formInputemail.value);
    }
    else if (data.user_type == 'Agent') {
        const formInputemail_trim = formInputemail.value.split('@')[0];
        window.alert(`Successful Login as ${formInputemail_trim}`);
        window.location.href = 'agent_user_frontend.html';
        console.log(formInputemail_trim);
        sessionStorage.setItem('Username',formInputemail_trim);
        sessionStorage.setItem('Email',formInputemail.value);
    }
    else if (data.user_type == 'Customer'){
        const formInputemail_trim = formInputemail.value.split('@')[0];
        window.alert(`Successful Login as ${formInputemail_trim}`);
        window.location.href = 'customer_user_frontend.html';
        console.log(formInputemail_trim);
        sessionStorage.setItem('Username',formInputemail_trim);
        sessionStorage.setItem('Email',formInputemail.value);
    }

        else {
            // Invalid
        }
        // window.location.href = 'dashboard.html'; // Redirect to dashboard
    }

});

const formInputemail_trim = formInputemail.value.split('@')[0];
console.log(formInputemail_trim);
sessionStorage.setItem('Username',formInputemail_trim);