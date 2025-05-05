"use strict";
/**
 * confirm-journal.js
 * -------------------------------------------------------------------
 * Сторінка Confirm Journal:
 *   • Показуємо контент (ховаємо #loader, показуємо #page-content).
 *   • Перевіряємо чекбокс #confirmationCheckbox при кліку на
 *     «Log in to claim» (#continueConfirmButton).
 *   • Якщо чекбокс не відмічено — підсвічуємо помилку (клас `invalid`).
 *   • Якщо відмічено — вставляємо спінер у кнопку, чекаємо 1 с і
 *     редиректимо на login.html.
 *
 *  ⚠️ Використовуємо готові CSS‑класи `.spinner` та `.spinner.small`.
 * -------------------------------------------------------------------
 */

(function () {
  let alreadyInitialized = false;

  /** Ховає глобальний спінер, показує основний контент */
  function showContent () {
    const loader = document.getElementById("loader");
    const content = document.getElementById("page-content");
    if (loader) loader.style.display = "none";
    if (content) content.style.display = "block";
  }

  function initConfirmJournalPage () {
    if (alreadyInitialized) return;
    alreadyInitialized = true;

    showContent();

    const checkbox = document.getElementById("confirmationCheckbox");
    const checkboxWrapper = document.querySelector(".checkbox-wrapper");
    const loginBtn = document.getElementById("continueConfirmButton");

    if (!checkbox || !loginBtn) return;

    /* Зняття помилки при зміні чекбокса */
    checkbox.addEventListener("change", () => {
      checkbox.classList.remove("invalid");
      checkboxWrapper?.classList.remove("invalid");
    });

    /* Перевірка, спінер + редирект із затримкою */
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (!checkbox.checked) {
        checkbox.classList.add("invalid");
        checkboxWrapper?.classList.add("invalid");
        return;
      }

      startButtonSpinner(loginBtn);

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000); // 1 секунда
    });
  }

  /**
   * Замінює вміст кнопки на анімований спінер.
   * Використовує класи .spinner та .spinner.small (CSS вже є у проекті).
   */
  function startButtonSpinner (btn) {
    if (btn.disabled) return; // спінер уже запущено

    // 👉 Фіксуємо поточну ширину, щоби після зміни контенту кнопка не "стрибала"
    const fixedWidth = btn.offsetWidth;
    btn.style.width = fixedWidth + "px";

    btn.disabled = true;
    const originalHTML = btn.innerHTML;
    btn.setAttribute("data-original-html", originalHTML);

    const spinner = document.createElement("span");
    spinner.className = "spinner small"; // існуючі CSS‑класи
    btn.innerHTML = "";
    btn.appendChild(spinner);
  }

  // Експортуємо в window на випадок потреби
  window.initConfirmJournalPage = initConfirmJournalPage;

  // Автозапуск після готовності DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initConfirmJournalPage);
  } else {
    initConfirmJournalPage();
  }
})();
