/**
 * showToast — reemplaza los alert() en toda la app.
 * Usa el elemento .toast definido en base.css
 * @param {string} message - texto a mostrar
 * @param {number} duration - ms que dura visible (default 3000)
 */
function showToast(message, duration = 3000) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}
