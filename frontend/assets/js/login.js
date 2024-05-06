import { login } from './api.js';
import toast from './toast.js';


const formLogin = document.getElementById('formLogin');

$(() => {
  // check if token exists
  const token = sessionStorage.getItem('token');

  if(token) {
    window.location.href = './index.html';
  }

  // get query params
  const urlParams = new URLSearchParams(window.location.search);
  const sessionExpired = urlParams.get('sessionExpired');

  if(sessionExpired === 'true') {
    toast.error('La sesión ha expirado, por favor inicia sesión nuevamente');
  }
});

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = await login(email, password);

  if(!data){
    toast.error("Usuario o contraseña incorrectos");
  }

  if(!data.token && !data.loggedUser){
    toast.error("Usuario o contraseña incorrectos");
    return;
  }

  const user = data.loggedUser;

  let redirect = './index.html';
  if(user.role === 'admin') {
    redirect = './Admin.html';
  }

  window.location.href = redirect;
});