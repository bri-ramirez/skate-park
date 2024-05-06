import { register } from './api.js';
import toast from './toast.js';

const formRegister = document.getElementById('formRegister');
const textError = document.getElementsByClassName('form-error')[0];

$(() => {
  // check if token exists
  const token = sessionStorage.getItem('token');

  if(token) {
    window.location.href = './index.html';
  }
});

console.log('textError', textError)


formRegister.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const expertise = document.getElementById('expertise').value;
  const specialty = document.getElementById('specialty').value;
  const photo = document.getElementById('photo').files[0];


  console.log('textError', textError)

  if(password !== confirmPassword) {
    toast.error('Las contraseñas no coinciden');
    
    textError.textContent = 'Las contraseñas no coinciden';
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
      sessionStorage.setItem('user', JSON.stringify(response.loggedUser));
      toast.success('Usuario registrado correctamente');
      window.location.href = './index.html';
    }

    textError.textContent = response.message;

    toast.error('Error al registrar usuario');

  } catch (error) {
    console.log('ERROR', error)
    textError.textContent = error.message;
    toast.error('Error al registrar usuario');
  }
});