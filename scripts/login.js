// scripts/login.js

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginButton = document.getElementById('loginButton');
  const mainContainer = document.querySelector('main');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    [emailInput, passwordInput].forEach(input => input.classList.remove('invalid'));

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let valid = true;

    if (!email) {
      emailInput.classList.add('invalid');
      valid = false;
    }

    if (!password) {
      passwordInput.classList.add('invalid');
      valid = false;
    }

    if (!valid) return;

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      emailInput.classList.add('invalid');
      return;
    }

    const domain = email.split('@')[1].toLowerCase();

    if (window.recognizedDomains.includes(domain)) {
      window.location.href = 'checkout.html';
    } else {
      renderAdditionalInfoStep();
    }
  });

  function renderAdditionalInfoStep() {
    const texts = pageTexts.additionalInfo;
    const container = document.getElementById('log-in-container');

    container.innerHTML = `
      <h2>${texts.title}</h2>
      <p>${texts.subtitle}</p>

      <form id="additionalInfoForm">
        <div class="input-group">
          <label for="additionalEmail">${texts.additionalEmailLabel}</label>
          <input type="email" id="additionalEmail" placeholder="${texts.additionalEmailInput}" />
          <span class="input-hint">${texts.additionalEmailHint}</span>
        </div>

        <div id="extraInfoContainer" style="display: none;">
          <p>${texts.infoText}</p>
          <div class="input-group">
            <label for="additionalInfo">${texts.infoLabel}</label>
            <textarea id="additionalInfo" placeholder="${texts.infoTextarea}"></textarea>
          </div>
        </div>

        <div class="button-group" style="justify-content: space-between; align-items: center;">
          <a href="#" class="signup-link" id="noJournalEmailLink" style="line-height: 32px;">I don’t have a journal email</a>
          <button class="btn btn-primary" id="continueAfterInfo">${texts.continueButton}</button>
        </div>
      </form>
    `;

    const noEmailLink = document.getElementById('noJournalEmailLink');
    const continueBtn = document.getElementById('continueAfterInfo');

    noEmailLink.addEventListener('click', function (e) {
      e.preventDefault();
      renderFallbackInfoStep();
    });

    continueBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const additionalEmailInput = document.getElementById('additionalEmail');
      const extraInfoContainer = document.getElementById('extraInfoContainer');
      const additionalInfoTextarea = document.getElementById('additionalInfo');
      const noEmailLink = document.getElementById('noJournalEmailLink');

      additionalEmailInput.classList.remove('invalid');
      if (additionalInfoTextarea) {
        additionalInfoTextarea.classList.remove('invalid');
      }

      const email = additionalEmailInput.value.trim();

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        additionalEmailInput.classList.add('invalid');
        return;
      }

      const domain = email.split('@')[1].toLowerCase();

      if (window.recognizedDomains.includes(domain)) {
        window.location.href = 'checkout.html';
      } else {
        if (extraInfoContainer.style.display === 'none') {
          extraInfoContainer.style.display = 'block';
          noEmailLink.style.display = 'none';
          additionalInfoTextarea.focus();
        } else {
          const extraText = additionalInfoTextarea.value.trim();
          if (!extraText) {
            additionalInfoTextarea.classList.add('invalid');
          } else {
            window.location.href = 'checkout.html';
          }
        }
      }
    });
  }

  function renderFallbackInfoStep() {
    const texts = pageTexts.additionalInfo;
    const container = document.getElementById('log-in-container');

    container.innerHTML = `
      <h2>${texts.title}</h2>
      <p>${texts.infoText}</p>

      <form id="fallbackInfoForm">
        <div class="input-group">
          <label for="additionalInfo">${texts.infoLabel}</label>
          <textarea id="additionalInfo" placeholder="${texts.infoTextarea}"></textarea>
        </div>

        <div class="button-group">
          <button class="btn btn-primary" id="continueAfterFallback">${texts.continueButton}</button>
        </div>
      </form>
    `;

    const continueBtn = document.getElementById('continueAfterFallback');
    continueBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const textarea = document.getElementById('additionalInfo');
      textarea.classList.remove('invalid');
      const text = textarea.value.trim();

      if (!text) {
        textarea.classList.add('invalid');
        return;
      }

      window.location.href = 'checkout.html';
    });
  }
});
