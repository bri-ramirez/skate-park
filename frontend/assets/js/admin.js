import { setListUsers } from "./utils/users.js";

const usersList = document.getElementById('tbody_list_users');

$(() => {

  // check if token exists
  const token = sessionStorage.getItem('token');

  if(token) {
    $("#auth-options").hide();
    $("#data-profile").show();
  } else {
    $("#auth-options").show();
    $("#data-profile").hide();
  }

  setListUsers(usersList)
});

