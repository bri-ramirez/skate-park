var bgColors = [
  "linear-gradient(to right, #00b09b, #96c93d)", // success
  "linear-gradient(to right, #ff5f6d, #ffc371)", // error
];

const toast = {
  info: function (message) {
    Toastify({
      text: message,
      className: 'info',
    }).showToast();
  },
  success: function (message) {
    Toastify({
      text: message,
      className: 'success',
      style: {
        background: bgColors[0],
      },
    }).showToast();
  },
  error: function (message) {
    Toastify({
      text: message,
      className: 'error',
      style: {
        background: bgColors[1],
      },
    }).showToast();
  },
};

export default toast;
