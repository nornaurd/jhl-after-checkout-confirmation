document.addEventListener('DOMContentLoaded', () => {
  const buttonIds = ['continueButton', 'continueButton2', 'continueButton3'];

  buttonIds.forEach(id => {
    const button = document.getElementById(id);
    if (!button) return;

    button.addEventListener('click', e => {
      e.preventDefault();

      // Заблокуємо кнопку
      button.disabled = true;

      // Зафіксуємо ширину, щоб не стрибала під час спінера
      const width = button.offsetWidth + 'px';
      button.style.width = width;

      // Додаємо спінер
      button.innerHTML = '<span class="spinner small"></span>';

      // Затримка 1 секунда перед редіректом
      setTimeout(() => {
        window.location.href = 'bussiness-portal.html';
      }, 1000);
    });
  });
});
git status
