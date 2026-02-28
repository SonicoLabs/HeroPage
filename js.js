// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-link, .mobile-menu .btn').forEach(el => {
    el.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, {threshold: 0.1});
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
    });
});

// Image dialog
const dialog = document.getElementById('image-viewer');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close-modal');

// Seleccionamos todas las imágenes dentro de los contenedores
document.querySelectorAll('.preview-img img').forEach(img => {
    img.addEventListener('click', () => {
        modalImg.src = img.src; // Copia la ruta de la imagen
        dialog.showModal();     // Abre el modal nativo
    });
});

// Cerrar al hacer click en el botón o fuera de la imagen
dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
});

closeBtn.addEventListener('click', () => dialog.close());