import { isAdmin, logout } from "./utils/auth.js";
import { setListUsers } from "./utils/users.js";

const usersList = document.getElementById('tbody_list_users');

$(() => {
  // check if token exists
  const token = sessionStorage.getItem('token');

  if(!token) {
    logout();
  }

  if(!isAdmin()) {
    window.location.href = './index.html';
  }

  if(token) {
    $("#auth-options").hide();
    $("#data-profile").show();
  } else {
    $("#auth-options").show();
    $("#data-profile").hide();
  }

  setListUsers(usersList)
});

