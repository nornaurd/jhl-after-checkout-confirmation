document.addEventListener('DOMContentLoaded', () => {
  const page = 'bussinessPortal';
  const t = pageTexts?.[page] ?? {};

  // === Перша модалка ===
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close-button" id="closeModalBtn" aria-label="Close modal">
        <img src="assets/ModalCloseButton.svg" alt="Close" />
      </button>
      <h2 class="medium-heading" id="bpModalHeading"></h2>
      <p id="bpModalDescription"></p>
      <ul class="summary-bullets" id="bpModalBullets"></ul>
      <div class="button-group">
        <button class="btn btn-primary" id="bpModalContinueBtn"></button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // === Заповнення текстів для першої модалки
  if (t.bpModalHeading) document.getElementById('bpModalHeading').textContent = t.bpModalHeading;
  if (t.bpModalDescription) document.getElementById('bpModalDescription').textContent = t.bpModalDescription;
  if (Array.isArray(t.bpModalBullets)) {
    const ul = document.getElementById('bpModalBullets');
    ul.innerHTML = t.bpModalBullets.map(item => `<li>${item}</li>`).join('');
  }
  if (t.bpModalContinueBtn) document.getElementById('bpModalContinueBtn').textContent = t.bpModalContinueBtn;

  // === Закриття першої модалки
  const closeModal = () => {
    modal.style.display = 'none';
    showBottomBanner();
  };
  document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
  document.getElementById('bpModalContinueBtn')?.addEventListener('click', closeModal);

  // === Банер ===
  function showBottomBanner() {
    const banner = document.createElement('div');
    banner.className = 'bottom-banner';
    banner.innerHTML = `
      <div class="banner-inner">
        <div class="banner-left">
          <h6 class="banner-heading" id="bpBannerHeading"></h6>
          <p class="banner-paragraph" id="bpBannerText"></p>
        </div>
        <div class="banner-right">
          <a href="#" class="banner-link" id="bpBannerLink"></a>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    if (t.bpBannerHeading) document.getElementById('bpBannerHeading').textContent = t.bpBannerHeading;
    if (t.bpBannerText) document.getElementById('bpBannerText').innerHTML = t.bpBannerText;
    if (t.bpBannerLink) document.getElementById('bpBannerLink').textContent = t.bpBannerLink;

    document.getElementById('bpBannerLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      showResendModal();
    });
  }

  // === Друга модалка: Resend email ===
  function showResendModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close-button" id="closeResendModal" aria-label="Close modal">
          <img src="assets/ModalCloseButton.svg" alt="Close" />
        </button>
        <h2 class="medium-heading" id="resendHeading"></h2>
        <p id="resendParagraph"></p>

        <div class="input-group input-disabled-with-icon">
          <input type="email" disabled />
          <img src="assets/pencil.svg" class="input-icon" alt="Edit icon" />
        </div>

        <div class="button-group">
          <button class="btn btn-google" id="cancelResend"></button>
          <button class="btn btn-primary" id="resendEmail"></button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Заповнення текстів
    if (t.resendHeading) document.getElementById('resendHeading').textContent = t.resendHeading;
    if (t.resendParagraph) document.getElementById('resendParagraph').textContent = t.resendParagraph;
    if (t.resendCancelButton) document.getElementById('cancelResend').textContent = t.resendCancelButton;
    if (t.resendSendButton) document.getElementById('resendEmail').textContent = t.resendSendButton;

    const emailInput = modal.querySelector('input[type="email"]');
    if (emailInput && t.resendEmailValue) emailInput.value = t.resendEmailValue;

    // Події
    const close = () => modal.remove();
    document.getElementById('closeResendModal')?.addEventListener('click', close);
    document.getElementById('cancelResend')?.addEventListener('click', close);

    document.getElementById('resendEmail')?.addEventListener('click', () => {
      alert('Email has been resent!');
      close();
    });
  }
});
