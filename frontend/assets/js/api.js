const urlServer = 'http://localhost:4000';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${urlServer}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if(data.token) {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.loggedUser));
    }

    return data;
  }
  catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export const register = async (data) => {
  try {
    const { name, email, password, specialty, expertise, photo } = data;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('specialty', specialty);
    formData.append('expertise', expertise);

    if (photo) formData.append('photo', photo);

    const response = await fetch(`${urlServer}/auth/register`, {
      method: 'POST',
      body: formData
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export const getUsers = async () => {
  try {
    const response = await fetch(`${urlServer}/user`);
    const data = await response.json();
    return data.users;
  }
  catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export const getUser = async (id) => {
  try {
    const response = await fetch(`${urlServer}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export const updateUser = async (id, data) => {

  const { name, email, specialty, expertise } = data;
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('specialty', specialty);
    formData.append('expertise', expertise);

    const response = await fetch(`${urlServer}/user/${id}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${urlServer}/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export const approveUser = async (id) => {
  try {
    const response = await fetch(`${urlServer}/user/approve/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      }
    });
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error:', error);
    return false;
  }
}