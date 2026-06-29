/* ============================================================
   Estación San Antonio de Padua - Línea Sarmiento
   Funcionalidades JavaScript (personalización e interacción)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ----------------------------------------------------------
       1. MODO CLARO / OSCURO
       Cambia el tema de la página y recuerda la preferencia
       del usuario usando localStorage.
    ---------------------------------------------------------- */

    const btnTema = document.getElementById('btn-tema');
    const cuerpo = document.body;

    // Recuperar preferencia guardada
    const temaGuardado = localStorage.getItem('tema-padua');
    if (temaGuardado === 'oscuro') {
        cuerpo.classList.add('modo-oscuro');
        btnTema.textContent = '☀️';
    }

    btnTema.addEventListener('click', function () {
        cuerpo.classList.toggle('modo-oscuro');
        const esOscuro = cuerpo.classList.contains('modo-oscuro');
        btnTema.textContent = esOscuro ? '☀️' : '🌙';
        localStorage.setItem('tema-padua', esOscuro ? 'oscuro' : 'claro');
    });

    /* ----------------------------------------------------------
       2. TAMAÑO DE TEXTO AJUSTABLE
       Permite agrandar o achicar el texto del contenido,
       con un mínimo y un máximo. También recuerda el valor.
    ---------------------------------------------------------- */

    const btnMas = document.getElementById('btn-texto-mas');
    const btnMenos = document.getElementById('btn-texto-menos');

    const ESCALA_MIN = 0.85;
    const ESCALA_MAX = 1.4;
    const PASO = 0.1;

    let escala = parseFloat(localStorage.getItem('escala-padua')) || 1;
    aplicarEscala();

    function aplicarEscala() {
        // Limitar el valor dentro del rango permitido
        escala = Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, escala));
        document.documentElement.style.fontSize = (escala * 100) + '%';
        localStorage.setItem('escala-padua', escala.toFixed(2));
    }

    btnMas.addEventListener('click', function () {
        escala += PASO;
        aplicarEscala();
    });

    btnMenos.addEventListener('click', function () {
        escala -= PASO;
        aplicarEscala();
    });

    /* ----------------------------------------------------------
       3. FILTRO DE HORARIOS POR TIPO DE DÍA
       Muestra u oculta las filas de la tabla según el botón
       seleccionado (todos / días de semana / fin de semana).
    ---------------------------------------------------------- */

    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    const filasHorario = document.querySelectorAll('.tabla-horarios tbody tr');

    botonesFiltro.forEach(function (boton) {
        boton.addEventListener('click', function () {

            // Marcar el botón activo
            botonesFiltro.forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');

            const filtro = boton.getAttribute('data-filtro');

            filasHorario.forEach(function (fila) {
                const tipo = fila.getAttribute('data-tipo');
                if (filtro === 'todos' || filtro === tipo) {
                    fila.style.display = '';
                } else {
                    fila.style.display = 'none';
                }
            });
        });
    });

    /* ----------------------------------------------------------
       4. GALERÍA CON LIGHTBOX
       Al hacer clic en una imagen de la galería se abre una
       vista ampliada sobre fondo oscuro.
    ---------------------------------------------------------- */

    const imagenesGaleria = document.querySelectorAll('.galeria-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCerrar = document.getElementById('lightbox-cerrar');

    imagenesGaleria.forEach(function (img) {
        img.addEventListener('click', function () {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('abierto');
            lightbox.setAttribute('aria-hidden', 'false');
        });
    });

    function cerrarLightbox() {
        lightbox.classList.remove('abierto');
        lightbox.setAttribute('aria-hidden', 'true');
    }

    lightboxCerrar.addEventListener('click', cerrarLightbox);

    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            cerrarLightbox();
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            cerrarLightbox();
        }
    });

    // Cerrar con Enter sobre el botón cerrar (accesibilidad)
    lightboxCerrar.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            cerrarLightbox();
        }
    });

});
