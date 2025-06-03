const modalesContainer = document.querySelector('.modales-container');
const talleresContenido = document.querySelector('.talleres-contenido');

document.addEventListener('DOMContentLoaded', () => {
  // HEADER
  fetch("pages/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;

      const nav = document.querySelector('.nav--principal');
      const toggle = document.querySelector('.nav-toggle');

      if (toggle && nav) {
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const isOpen = nav.classList.toggle('open');
          toggle.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', (e) => {
          if (!nav.contains(e.target)) {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });

  // MODALES
  fetch('pages/modals.html')
    .then(res => res.text())
    .then(html => {
      if (!modalesContainer) return;
      modalesContainer.insertAdjacentHTML('beforeend', html);
      initModalListeners();
    });
});

function initModalListeners() {
  const botones = document.querySelectorAll('[data-modal-target]');

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-modal-target');
      const modal = document.querySelector(target);

      // Cierra cualquier otro modal abierto
      document.querySelectorAll('.modal.open').forEach(m => {
        m.classList.remove('open');
        m.setAttribute('aria-hidden', 'true');
      });

      if (modal) {
        // Mostrar el contenedor antes de animar
        modalesContainer.classList.add('modal-abierto');
        if (talleresContenido) talleresContenido.style.width = '50%';

        // Usar requestAnimationFrame para que el browser tenga tiempo de aplicar el estilo antes de abrir
        requestAnimationFrame(() => {
          modal.classList.add('open');
          modal.setAttribute('aria-hidden', 'false');
        });
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        cerrarContenedorModal();
      }
    });
  });

  // Click fuera del modal
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-modal-target]')) return;

    document.querySelectorAll('.modal.open').forEach(modal => {
      const content = modal.querySelector('.modal-content');
      if (content && !content.contains(e.target)) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        cerrarContenedorModal();
      }
    });
  });

  // ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.open').forEach(modal => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      });
      cerrarContenedorModal();
    }
  });

  // Limpieza inicial
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });
  cerrarContenedorModal(true); // true para no animar el cierre inicial
}

function cerrarContenedorModal(sinTransicion = false) {
  if (modalesContainer) {
    modalesContainer.classList.remove('modal-abierto');
  }
  if (talleresContenido) talleresContenido.style.width = '100%';
}
