
window.eventos = {
  "arte-y-vino": {
    visible: true,
    descripcion: "Totebag - 27 de julio - 19.30 a 21.30 hs"
  },
  "arte-y-merienda": {
    visible: false,
    descripcion: "Bastidor - 8 de julio, 16 a 18 hs"
  },
  "taller-rotativos": {
    visible: false,
    descripcion: "hola"
  }
};



function aplicarFechas() {
  const eventos = window.eventos;

  // 1) Actualizo las tarjetas y los modales (si existen) con cada fecha:
  for (const key in eventos) {
    const { visible, descripcion } = eventos[key];

    const cardFecha = document.querySelector(`[data-evento="${key}-card"]`);
    if (cardFecha) {
      cardFecha.textContent = visible ? descripcion : "A confirmar.";
    }

    const modalFecha = document.querySelector(`[data-evento="${key}-modal"]`);
    if (modalFecha) {
      if (visible) {
        modalFecha.textContent = `Próxima edición: ${descripcion}`;
      } else {
        modalFecha.remove();
      }
    }
  }

  // 2) Construyo la lista de próximos eventos visibles
  const lista = Object.entries(eventos)
    .filter(([_, data]) => data.visible)
    .map(([key, data]) => {
      const nombre = key
        .replaceAll("-", " ")
        .replace(/\b\w/g, l => l.toUpperCase());
      return `<li><strong>${nombre}</strong>: ${data.descripcion}</li>`;
    })
    .join("");

  // 3) Si hay al menos uno visible y no existe ya el popup, lo creo
  if (lista && !document.querySelector(".proximos-eventos")) {
    const aviso = document.createElement("div");
    aviso.className = "proximos-eventos";
    aviso.innerHTML = `
      <button class="cerrar-popup" aria-label="Cerrar">×</button>
      <p>Próximos eventos:</p>
      <ul>${lista}</ul>
    `;
    document.body.prepend(aviso);

    // 4) Animación de “fade-in + slide-down” al agregar .visible (100 ms después)
    setTimeout(() => {
      aviso.classList.add("visible");
    }, 100);

    // 5) Al hacer clic en cualquier parte del aviso, hago scroll a "#talleres"
    aviso.addEventListener("click", () => {
      const seccion = document.querySelector("#talleres");
      if (seccion) {
        seccion.scrollIntoView({ behavior: "smooth" });
      }
    });

    // 6) Botón “×” para cerrar el popup
    const btnCerrar = aviso.querySelector(".cerrar-popup");
    btnCerrar.addEventListener("click", (e) => {
      e.stopPropagation();
      aviso.classList.remove("visible");
      setTimeout(() => aviso.remove(), 600);
    });

    // 7) Cada 50 s agrego la clase “saltito” para animar un pequeño bounce
    setInterval(() => {
      aviso.classList.add("saltito");
      setTimeout(() => aviso.classList.remove("saltito"), 600);
    }, 10000);
  }
}

// 8) Programo la ejecución de aplicarFechas() 30 segundos después de DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // Si hubiera algún popup viejo, lo remuevo antes de todo:
  document.querySelectorAll(".proximos-eventos").forEach(el => el.remove());

  // Espero 30 000 ms (30 segundos) y luego llamo a aplicarFechas()
  setTimeout(() => {
    aplicarFechas();
  }, 2000);
});
