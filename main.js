// main.js

// Función que engancha eventos de abrir/cerrar modal
function initModalListeners() {
  // Abrir modal
  document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.querySelector(btn.dataset.modalTarget);
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  // Cerrar modal con “×”
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
  });

  // Cerrar al clickear fuera del contenido
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });
}

// Al cargar la página, traemos los modales y luego inicializamos listeners
document.addEventListener('DOMContentLoaded', () => {
  fetch('modals.html')
    .then(res => res.text())
    .then(html => {
      // Inyecta los modales al final del <body>
      document.body.insertAdjacentHTML('beforeend', html);
      // Ahora que ya están en el DOM, enganchá los botones
      initModalListeners();
    })
    .catch(err => console.error('Error cargando modales:', err));
});

//menu hamb
const nav = document.querySelector('.nav--principal');
const toggle = document.querySelector('.nav-toggle');

// Toggle al hacer clic en el botón
toggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita que el click se propague y lo cierre instantáneamente
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
});

// Cierra el menú si hacés clic fuera de él
document.addEventListener('click', (e) => {
  if (
    nav.classList.contains('open') &&
    !nav.contains(e.target)
  ) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
