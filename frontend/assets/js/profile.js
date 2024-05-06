import { updateUser, deleteUser } from './api.js';
import toast from './toast.js';

let user = null;
const updateForm = document.getElementById('updateForm');
const deleteBtn = document.getElementById('deleteBtn');

const setProfileData = async (user) => {

  document.getElementById('name').value = user.name;
  document.getElementById('email').value = user.email;
  document.getElementById('specialty').value = user.specialty;
  document.getElementById('expertise').value = user.expertise;
  document.getElementById('password').value = user.password;
  document.getElementById('confirm_password').value = user.password;

  if(user.photo) {
    document.getElementById('profile_picture').src = user.photo;
  }
};



$(() => {
  // check if token exists
  const token = sessionStorage.getItem('token');

  if(!token) {
    window.location.href = './Login.html';
    return;
  }

  user = JSON.parse(sessionStorage.getItem('user'));

  if(!user){
    toast.error("Ha ocurrido un error al obtener la información del usuario");
    return;
  }

  setProfileData(user);
});

updateForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm_password').value;
  const expertise = document.getElementById('expertise').value;
  const specialty = document.getElementById('specialty').value;

  if(password !== confirmPassword) {
    toast.error('Las contraseñas no coinciden');
    return;
  }

  const data = {
    name,
    email,
    password,
    expertise,
    specialty,
  };

  const response = await updateUser(user.id, data);

  if(response.status === 'Ok') {
    toast.success('Usuario actualizado correctamente');
    return;
  }

  if(response.status === 401) {
    // Unauthorized
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = './Login.html?sessionExpired=true';
    return;
  }

  toast.error('Error al actualizar usuario');
});

deleteBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const response = await deleteUser(user.id);

  // if the user is deleted, remove the token and user from session storage
  if(response.status === 'Ok') {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = './Login.html';
    return;
  }

  // if the token is invalid, redirect to login
  if(response.status === 401) {
    // Unauthorized
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = './Login.html?sessionExpired=true';
    return;
  }

  toast.error('Error al eliminar usuario');
});