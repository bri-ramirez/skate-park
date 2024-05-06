import { approveUser, getUsers } from "../api.js";
import toast from "../toast.js";
import { isAdmin, logout } from "./auth.js";

export const setListUsers = async (listElement) => {
  listElement.innerHTML = '';

  const users = await getUsers();

  if(!users || users.length === 0){
    listElement.innerHTML = `
      <tr>
        <td colspan="7" class="text-center">No existen participantes aún.</td>
      </tr>
    `;

    return;
  }

  users.forEach(user => {

    const statusRoleUser = `
      <span class="badge p-2 ${user.status ? 'bg-success' : 'bg-warning'}">
        ${user.status ? 'Aprobado' : 'En revisión'}
      </span>
    `;

    // checkbox
    const statusRoleAdmin = `
      <div class="form-check form-switch">
        <input class="form-check-input approve-user" type="checkbox" role="switch" data-id="${user.id}" ${user.status === true ? 'checked' : ''}>
      </div>
    `;
    
    listElement.innerHTML += `
      <tr id="tr-${user.id}">
        <td>${user.id}</td>
        <td id="img-${user.id}"></td>
        <td>${user.name}</td>
        <td>${user.expertise}</td>
        <td>${user.specialty}</td>
        <td>${ isAdmin() ? statusRoleAdmin : statusRoleUser }</td>
        </td>
      </tr>
    `;

    const photo = document.createElement('img');
    photo.classList.add('img-list-users');

    // if user has not photo, use default image
    photo.src = user.photo ?? './assets/images/default-user.jpg';
    document.getElementById(`img-${user.id}`).appendChild(photo);
  });

  $(`.approve-user`).change(async function(){
    const id = $(this).data('id');
  
    const response = await approveUser(id);

    if(response.status === 401){
      logout();
    }

      if(response.status === 'Ok'){
        toast.success('Usuario actualizado correctamente');
        setListUsers(listElement);
      }
  });

  // console.log(check)

  // check.addEventListener('change', async () => {

  //   console.log('change')
  //   const response = await approveUser(user.id);

  //   console.log(response);
  //   if(response.status === 'Ok'){
  //     document.getElementById(`tr-${user.id}`).innerHTML = '';
  //     setListUsers(listElement);
  //   }
  // });
}