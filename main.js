const modalesContainer = document.querySelector('.modales-container');
const talleresContenido = document.querySelector('.talleres-contenido');

document.addEventListener('DOMContentLoaded', () => {
  // HEADER
  fetch("pages/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
    });

  // MENÚ HAMBURGUESA
  const nav = document.querySelector('.nav--principal');
  const toggle = document.querySelector('.nav-toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

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

      // Abre el nuevo modal
      if (modal) {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        if (modalesContainer) {
          modalesContainer.classList.add('modal-abierto');
          modalesContainer.style.width = '50%';
        }
        if (talleresContenido) talleresContenido.style.width = '50%';
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        if (modalesContainer) {
          modalesContainer.classList.remove('modal-abierto');
          modalesContainer.style.width = '0';
        }
        if (talleresContenido) talleresContenido.style.width = '100%';
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
        if (modalesContainer) {
          modalesContainer.classList.remove('modal-abierto');
          modalesContainer.style.width = '0';
        }
        if (talleresContenido) talleresContenido.style.width = '100%';
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
      if (modalesContainer) {
        modalesContainer.classList.remove('modal-abierto');
        modalesContainer.style.width = '0';
      }
      if (talleresContenido) talleresContenido.style.width = '100%';
    }
  });

  // Limpieza inicial
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });
  if (modalesContainer) {
    modalesContainer.classList.remove('modal-abierto');
    modalesContainer.style.width = '0';
  }
  if (talleresContenido) talleresContenido.style.width = '100%';
}
