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

// Dropdown toggle
const userDropdownBtn = document.getElementById("userDropdownBtn");
if (userDropdownBtn) {
  userDropdownBtn.addEventListener("click", function() {
    const dropdown = this.parentElement;
    if (dropdown) dropdown.classList.toggle("show");
  });
}


const inputDisplayName = document.getElementById("displayName");
const inputEmail = document.getElementById("email");
const inputSavePersonalInfoBtn = document.getElementById("savePersonalInfoBtn");

const inputCurrentPassword = document.getElementById("currentPassword");
const inputNewPassword = document.getElementById("newPassword");
const inputConfirmPassword = document.getElementById("confirmPassword");
const changePasswordBtn = document.getElementById("changePasswordBtn");

if (inputSavePersonalInfoBtn){
  inputSavePersonalInfoBtn.addEventListener('click',async (event)=>{
    event.preventDefault();
    const {data,error} = await supabaseClient
    .from('users')
    .update({'display_name':inputDisplayName.value,'email':inputEmail.value})
    .eq('display_name',userNameEl.textContent);
    alert('Personal information updated successfully.');
  });
}

if (changePasswordBtn){
  changePasswordBtn.addEventListener('click',async (event)=>{
    event.preventDefault();

    if (inputCurrentPassword.value !== inputNewPassword.value){
      alert('Password do not match');
    }

    if (isStrongpassword(inputNewPassword)){
      alert('Password is not strong enough');
    }

    const {data,error} = await supabaseClient
    .from('users')
    .update({'passwords':inputNewPassword.value})
    .eq('display_name',userNameEl.textContent);
    alert('Password updated successfully.');
  });
}

function isStrongpassword(password){
  const minLength = 8;

  return password.length >= minLength
}


