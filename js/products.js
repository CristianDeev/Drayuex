document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".product-card");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const countEl = document.querySelector(".products-count");
  const titleEl = document.querySelector(".products-header h2");

  const CAT_LABELS = {
    todos: "Drop 01 · Drayuex Legacy",
    hombre: "Colección Hombre",
    mujer: "Colección Mujer",
    accesorios: "Accesorios",
  };

  // ── FILTRO POR CATEGORÍA (hombre / mujer / accesorios) ──────
  function applyFilter(cat) {
    let visibleCount = 0;

    cards.forEach((card) => {
      const cardCat = card.dataset.cat;
      const show = cat === "todos" || cardCat === cat;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    filterBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === cat);
    });

    if (titleEl && CAT_LABELS[cat]) {
      titleEl.textContent = CAT_LABELS[cat];
    }
    if (countEl) {
      countEl.textContent = `${visibleCount} pieza${visibleCount === 1 ? "" : "s"}`;
    }
  }

  // Categoría inicial: toma ?cat= de la URL (así los links del header
  // "Hombre" / "Mujer" / "Accesorios" ya filtran solos al llegar aquí)
  const params = new URLSearchParams(window.location.search);
  const initialCat = params.get("cat") || "todos";
  applyFilter(initialCat);

  // Botones de filtro dentro de la página (no recargan, solo filtran)
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;
      const url = new URL(window.location);
      if (cat === "todos") {
        url.searchParams.delete("cat");
      } else {
        url.searchParams.set("cat", cat);
      }
      window.history.replaceState({}, "", url);
      applyFilter(cat);
    });
  });

  // ── BOTÓN "VER PRODUCTO" / PRENDAS BLOQUEADAS ────────────────
  cards.forEach((card) => {
    const btn = card.querySelector(".product-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const name = card.querySelector(".product-name")?.textContent || "este producto";

      if (card.classList.contains("product-card--locked")) {
        showToast(`${name} — No disponible por ahora.`);
        return;
      }

      showToast(`${name} — Ficha completa próximamente.`);
    });
  });
});
