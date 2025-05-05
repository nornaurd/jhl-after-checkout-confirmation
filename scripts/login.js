// scripts/login.js

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
  
    if (loginButton) {
      loginButton.addEventListener('click', function (event) {
        event.preventDefault(); // запобігає перезавантаженню форми
        window.location.href = 'checkout.html'; // редірект
      });
    } else {
      console.error('Кнопка з id="loginButton" не знайдена.');
    }
  });
  