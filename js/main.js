// SANA 1937 - JavaScript Principal

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Inicializar aplicación
function initializeApp() {
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    initScrollAnimations();
    initStickyHeader();
    initHeroScrollButton();
}

// Menu móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function () {
            mobileNav.classList.toggle('active');

            // Cambiar icono del menú
            const icon = menuToggle.querySelector('span');
            if (mobileNav.classList.contains('active')) {
                icon.textContent = '✕';
            } else {
                icon.textContent = '☰';
            }
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = mobileNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const icon = menuToggle.querySelector('span');
                icon.textContent = '☰';
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function (e) {
            if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileNav.classList.remove('active');
                const icon = menuToggle.querySelector('span');
                icon.textContent = '☰';
            }
        });
    }
}

// Scroll suave
function initSmoothScroll() {
    // Specific handlers for anchor sections
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}// Header pegajoso
function initStickyHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    if (header) {
        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
}

// Animaciones al scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');

    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Validación de formularios
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(form);
            const isValid = validateForm(form);

            if (isValid) {
                handleFormSubmission(form, formData);
            }
        });

        // Validación en tiempo real
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                clearFieldError(this);
            });
        });
    });
}

// Validar formulario completo
function validateForm(form) {
    const inputs = form.querySelectorAll('.form-input[required], .form-textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type || field.tagName.toLowerCase();
    let isValid = true;
    let errorMessage = '';

    // Campo requerido
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    }

    // Validación de email
    if (fieldType === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Por favor ingresa un email válido';
    }

    // Mostrar o limpiar error
    if (isValid) {
        clearFieldError(field);
    } else {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar error en campo
function showFieldError(field, message) {
    clearFieldError(field);

    field.classList.add('error');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';

    field.parentNode.appendChild(errorDiv);
}

// Limpiar error en campo
function clearFieldError(field) {
    field.classList.remove('error');

    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Manejar envío de formulario
function handleFormSubmission(form, formData) {
    const submitBtn = form.querySelector('.btn[type="submit"], .btn-submit');
    const originalText = submitBtn ? submitBtn.textContent : '';

    // Mostrar estado de carga
    if (submitBtn) {
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
    }

    // Simular envío (aquí conectarías con tu backend)
    setTimeout(() => {
        showSuccessMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.');
        form.reset();

        // Restaurar botón
        if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, 1500);
}

// Mostrar mensaje de éxito
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        background-color: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        margin: 20px 0;
        text-align: center;
        animation: fadeInUp 0.5s ease;
    `;

    // Insertar mensaje
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(successDiv, form);

        // Remover después de 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Utilidades adicionales
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading para imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Contador animado
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);

        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Cambio de tema (si se implementa modo oscuro)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');

            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Hero Scroll Button
function initHeroScrollButton() {
    const scrollBtn = document.querySelector('.scroll-down-btn');

    if (scrollBtn) {
        // Animación de pulsación del botón
        setInterval(() => {
            scrollBtn.classList.add('pulse');
            setTimeout(() => {
                scrollBtn.classList.remove('pulse');
            }, 2000);
        }, 4000);
    }
}

// Función para scroll suave hacia el contenido
function scrollToContent() {
    const nextSection = document.querySelector('.section');
    if (nextSection) {
        nextSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Exportar funciones para uso global
window.SANA1937 = {
    initMobileMenu,
    initSmoothScroll,
    initFormValidation,
    initScrollAnimations,
    showSuccessMessage,
    animateCounter,
    debounce
};

// Hacer función globalmente accesible
window.scrollToContent = scrollToContent;