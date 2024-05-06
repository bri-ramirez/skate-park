export const isLogged = () => {
  return sessionStorage.getItem('token') ? true : false;
}

export const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  window.location.href = './Login.html';
}

export const getUser = () => {
  return JSON.parse(sessionStorage.getItem('user'));
}

export const getToken = () => {
  return sessionStorage.getItem('token');
}

export const isAdmin = () => {
  const user = getUser();
  return user.role === 'admin';
}