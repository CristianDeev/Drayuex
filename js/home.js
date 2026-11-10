document.addEventListener("DOMContentLoaded", () => {

  // ── COUNTDOWN ──────────────────────────────────────
  // Drop 02: 66 días desde el 23 de agosto de 2026.
  // Si necesitas mover la fecha, cambia solo este valor.
  const DROP_DATE = new Date("2026-10-28T00:00:00");

  function updateCountdown() {
    const now = new Date();
    const diff = DROP_DATE - now;

    if (diff <= 0) {
      document.getElementById("cd-days").textContent = "00";
      document.getElementById("cd-hours").textContent = "00";
      document.getElementById("cd-minutes").textContent = "00";
      document.getElementById("cd-seconds").textContent = "00";
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("cd-days").textContent    = String(days).padStart(2, "0");
    document.getElementById("cd-hours").textContent   = String(hours).padStart(2, "0");
    document.getElementById("cd-minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("cd-seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ── PRÓXIMO DROP BUTTON ────────────────────────────
  const nextDropBtn = document.getElementById("nextDropBtn");
  if (nextDropBtn) {
    nextDropBtn.addEventListener("click", () => {
      document.getElementById("notify-section")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ── NOTIFY FORM ────────────────────────────────────
  const notifyForm = document.getElementById("notifyForm");
  if (notifyForm) {
    notifyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = notifyForm.querySelector("input[type='email']");
      const email = input?.value?.trim();
      const submitBtn = notifyForm.querySelector("button[type='submit']");

      if (!email) return;

      // Evita doble-click mientras se envía
      if (submitBtn) submitBtn.disabled = true;

      // Reemplaza estos dos IDs por los tuyos (pasos 2 y 3 de EmailJS)
      emailjs.send("service_iljhfcy", "template_nstr1nd", {
        to_email: email,
      })
        .then(() => {
          showToast("¡Listo! Revisa tu correo, te avisamos cuando caiga el Drop 02.");
          input.value = "";
        })
        .catch((error) => {
          console.error("Error enviando correo:", error);
          showToast("Algo falló al enviar el correo. Intenta de nuevo.");
        })
        .finally(() => {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

});