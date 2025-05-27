// Inicia los listeners de los modales
function initModalListeners() {
  // Abrir modal
  document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.querySelector(btn.dataset.modalTarget);
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  // Cerrar modal con la "×"
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
  });

  // Cerrar modal al hacer clic fuera del contenido
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // Cerrar modal al clickear "Contactanos"
  document.querySelectorAll('.btn-a-contacto').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const modal = btn.closest('.modal');
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');

      // Scroll al formulario
      setTimeout(() => {
        const destino = document.querySelector('#contacto');
        if (destino) {
          destino.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    });
  });
}

// Carrusel funcional dentro de modal
function initCarrusel() {

  const carrusel = document.querySelector('.carrusel-imagenes');
  if (!carrusel) {
    return;
  }

  const imagenes = carrusel.querySelectorAll('img');

  let index = 0;

  const prevBtn = document.querySelector('.carrusel-btn.prev');
  const nextBtn = document.querySelector('.carrusel-btn.next');

  if (!prevBtn || !nextBtn) {
    return;
  }

  function updateCarrusel() {
    carrusel.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + imagenes.length) % imagenes.length;
    updateCarrusel();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % imagenes.length;
    updateCarrusel();
  });
}

// Cargar modales y ejecutar listeners y carrusel
document.addEventListener('DOMContentLoaded', () => {
  fetch('modals.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
      initModalListeners();
      initCarrusel();
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


