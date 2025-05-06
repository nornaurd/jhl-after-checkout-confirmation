// scripts/signup.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const container = document.getElementById('log-in-container');
    const heading = document.getElementById('signupTitle');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const firstName = document.getElementById('firstNameInput');
      const lastName = document.getElementById('lastNameInput');
      const email = document.getElementById('signupEmailInput');
      const password = document.getElementById('signupPasswordInput');
      const checkbox = document.getElementById('signupCheckbox');
  
      let valid = true;
  
      [firstName, lastName, email, password].forEach(field => {
        field.classList.remove('invalid');
        if (!field.value.trim()) {
          field.classList.add('invalid');
          valid = false;
        }
      });
  
      if (!checkbox.checked) {
        checkbox.classList.add('invalid');
        valid = false;
      } else {
        checkbox.classList.remove('invalid');
      }
  
      if (!valid) return;
  
      const emailValue = email.value.trim();
      const domain = emailValue.split('@')[1]?.toLowerCase();
  
      if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
        email.classList.add('invalid');
        return;
      }
  
      if (window.recognizedDomains.includes(domain)) {
        window.location.href = 'checkout.html';
      } else {
        renderAdditionalInfo();
      }
    });
  
    function renderAdditionalInfo() {
      const texts = pageTexts.additionalInfo;
  
      heading.textContent = texts.title;
  
      container.innerHTML = `
        <h2>${texts.title}</h2>
        <p>${texts.infoText}</p>
        <form id="extraInfoForm">
          <div class="input-group">
            <label for="additionalInfo">${texts.infoLabel}</label>
            <textarea id="additionalInfo" placeholder="${texts.infoTextarea}"></textarea>
          </div>
          <div class="button-group">
            <button class="btn btn-primary" id="continueAfterExtra">${texts.continueButton}</button>
          </div>
        </form>
      `;
  
      const continueBtn = document.getElementById('continueAfterExtra');
      continueBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const textarea = document.getElementById('additionalInfo');
        textarea.classList.remove('invalid');
        const value = textarea.value.trim();
  
        if (!value) {
          textarea.classList.add('invalid');
          return;
        }
  
        window.location.href = 'checkout.html';
      });
    }
  });
  