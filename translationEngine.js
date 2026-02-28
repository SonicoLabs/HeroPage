import * as idioms from "./translations/translations.js";

// ─────────────────────────────────────────────────────
//  TRADUCCIONES
//  data-i18n       → reemplaza textContent
//  data-i18n-html  → reemplaza innerHTML (permite <br> y <em>)
// ─────────────────────────────────────────────────────

const translations = {
    es: idioms.es,
    en: idioms.en
}

function getNestedValue(obj, path) {
    return obj[path];
}

function applyTranslations(lang) {
    console.log("aplicando traducciones")
    const t = translations[lang];
    if (!t) return;

    // textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(t, key);
        if (value !== undefined) el.textContent = value;
    });

    // innerHTML (para textos con <br> o <em>)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const value = getNestedValue(t, key);
        if (value !== undefined) el.innerHTML = value;
    });

    // Actualiza el atributo lang del HTML (bueno para SEO y accesibilidad)
    document.documentElement.lang = lang;

    // Actualiza el título de la página
    document.title = lang === 'es'
        ? 'Sonico — La plataforma para músicos'
        : 'Sonico — The platform for musicians';

    // Actualiza los botones del selector
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Guarda preferencia en localStorage
    localStorage.setItem('sonico-lang', lang);
}

// Inicializar al cargar: usa localStorage si existe, si no detecta el navegador
function detectInitialLang() {
    const saved = localStorage.getItem('sonico-lang');
    if (saved && translations[saved]) return saved;
    const browser = (navigator.language || navigator.userLanguage || 'es').slice(0, 2);
    return translations[browser] ? browser : 'es';
}

// Asignar eventos a todos los botones de idioma
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTranslations(btn.dataset.lang));
});

// Aplicar idioma inicial
applyTranslations(detectInitialLang());