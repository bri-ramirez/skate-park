import { register } from './api.js';
import toast from './toast.js';

const formRegister = document.getElementById('formRegister');

$(() => {
  // check if token exists
  const token = sessionStorage.getItem('token');

  if(token) {
    window.location.href = './index.html';
  }
});

formRegister.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const expertise = document.getElementById('expertise').value;
  const specialty = document.getElementById('specialty').value;
  const photo = document.getElementById('photo').files[0];

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

  if(photo && photo.size > 0) {
    data.photo = photo;
  }

  try {
    const response = await register(data);

    if(response.status === 'Ok') {
      sessionStorage.setItem('token', response.token);
      toast.success('Usuario registrado correctamente');
      window.location.href = './index.html';
    }

    toast.error('Error al registrar usuario');

  } catch (error) {
    console.log('ERROR', error)
    toast.error('Error al registrar usuario');
  }
});