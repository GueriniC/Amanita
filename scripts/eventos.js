window.eventos = {
  "arte-y-vino": {
    visible: true,
    descripcion: "Totebag - 9 de julio, 15 a 19 hs"
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

  const lista = Object.entries(eventos)
    .filter(([_, data]) => data.visible)
    .map(([key, data]) => {
      const nombre = key.replaceAll("-", " ").replace(/\b\w/g, l => l.toUpperCase());
      return `<li><strong>${nombre}</strong>: ${data.descripcion}</li>`;
    })
    .join("");

  if (lista && !document.querySelector(".proximos-eventos")) {
    const aviso = document.createElement("div");
    aviso.className = "proximos-eventos";
    aviso.innerHTML = `
      <button class="cerrar-popup" aria-label="Cerrar">×</button>
      <p>Próximos eventos:</p>
      <ul>${lista}</ul>
    `;
    document.body.prepend(aviso);

    // Mostrar con animación
    setTimeout(() => {
      aviso.classList.add("visible");
    }, 100);

    // Click en todo el bloque te lleva a #talleres
    aviso.addEventListener("click", () => {
      const seccion = document.querySelector("#talleres");
      if (seccion) {
        seccion.scrollIntoView({ behavior: "smooth" });
      }
    });

    // Botón cerrar
    const btnCerrar = aviso.querySelector(".cerrar-popup");
    btnCerrar.addEventListener("click", (e) => {
      e.stopPropagation();
      aviso.classList.remove("visible");
      setTimeout(() => aviso.remove(), 600);
    });
  }
}

document.addEventListener("DOMContentLoaded", aplicarFechas);
