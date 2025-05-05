"use strict";
/**
 * index.js
 * --------------------------------------------------------------------
 * Головна сторінка пошуку ISSN/журналу.
 *  – Перевіряємо введення у полі #searchPlaceholder.
 *  – При кліку на "Continue" (#continueIndexButton):
 *      • Якщо поле порожнє — показуємо помилку.
 *      • Якщо заповнено — вставляємо спінер у кнопку, фіксуємо ширину,
 *        блокуємо кнопку, чекаємо 1 с і переходимо на confirm-journal.html.
 *  – Підтримуємо простий "autocomplete"‑dropdown.
 *
 * Використовує готові CSS‑класи .spinner / .spinner.small для анімації.
 * --------------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchPlaceholder");
  const searchErrorText = document.getElementById("searchError");
  const continueBtn = document.getElementById("continueIndexButton");
  const dropdown = document.getElementById("dropdown");

  /* --------------------------------------------------
   *  Валідація та редирект із спінером
   * -------------------------------------------------- */
  if (continueBtn) {
    continueBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let valid = true;
      const value = searchInput?.value.trim();

      if (!value) {
        searchInput?.classList.add("invalid");
        if (searchErrorText) searchErrorText.style.display = "block";
        valid = false;
      } else {
        searchInput?.classList.remove("invalid");
        if (searchErrorText) searchErrorText.style.display = "none";
      }

      if (!valid) return;

      // Усе гаразд — показуємо спінер + затримка 1 с
      startButtonSpinner(continueBtn);

      setTimeout(() => {
        window.location.href = "confirm-journal.html";
      }, 1000);
    });
  }

  /* --------------------------------------------------
   *  Dropdown‑підказка
   * -------------------------------------------------- */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      if (!dropdown) return;
      const hasText = !!searchInput.value.trim();
      dropdown.style.display = hasText ? "block" : "none";
      if (hasText) {
        dropdown.innerHTML = `
          <div class="dropdown-item">
            <div class="dropdown-title">Nature Sciences</div>
            <div class="dropdown-issn">Wiley · 1741-7007</div>
          </div>`;
      }
    });

    dropdown?.addEventListener("click", (e) => {
      const item = e.target.closest(".dropdown-item");
      if (item) {
        searchInput.value = "1741-7007, Nature Sciences";
        dropdown.style.display = "none";
      }
    });

    // Ховаємо dropdown, коли input втрачає фокус
    searchInput.addEventListener("blur", () => {
      setTimeout(() => {
        if (dropdown) dropdown.style.display = "none";
      }, 150);
    });
  }

  /* --------------------------------------------------
   *  Допоміжна функція: показати спінер у кнопці та зафіксувати ширину
   * -------------------------------------------------- */
  function startButtonSpinner(btn) {
    if (!btn || btn.disabled) return; // уже запущено або кнопки нема

    // Фіксуємо поточну ширину, щоб кнопка не "стрибала"
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
});
