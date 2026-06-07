document.addEventListener('DOMContentLoaded', () => {

    // =====================
    // Hamburger & Side Menu
    // =====================
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('overlay');
    const closeMenu = document.getElementById('close-menu');

    function openMenu() {
        if(hamburger) hamburger.classList.add('active');
        if(sideMenu) sideMenu.classList.add('active');
        if(overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenuFn() {
        if(hamburger) hamburger.classList.remove('active');
        if(sideMenu) sideMenu.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (sideMenu && sideMenu.classList.contains('active')) {
                closeMenuFn();
            } else {
                openMenu();
            }
        });
    }

    if (closeMenu) closeMenu.addEventListener('click', closeMenuFn);
    if (overlay) overlay.addEventListener('click', closeMenuFn);

    document.querySelectorAll('.side-link').forEach(link => {
        link.addEventListener('click', closeMenuFn);
    });

    // =====================
    // Logo follows mouse
    // =====================
    const heroLogo = document.querySelector('.hero-logo');
    const logoSvg = document.querySelector('.logo-svg');

    if (heroLogo && logoSvg) {
        heroLogo.addEventListener('mouseenter', () => {
            logoSvg.style.transform = 'scale(0.85)';
        });

        heroLogo.addEventListener('mouseleave', () => {
            logoSvg.style.transform = 'scale(1) translate(0, 0)';
        });

        heroLogo.addEventListener('mousemove', (e) => {
            const rect = heroLogo.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const moveX = (e.clientX - centerX) / 8;
            const moveY = (e.clientY - centerY) / 8;
            logoSvg.style.transform = `scale(0.85) translate(${moveX}px, ${moveY}px)`;
        });

        let touchActive = false;
        let logoStartX = 0;
        let logoStartY = 0;

        heroLogo.addEventListener('touchstart', (e) => {
            touchActive = true;
            const touch = e.touches[0];
            logoStartX = touch.clientX;
            logoStartY = touch.clientY;
            logoSvg.style.transition = 'none';
            logoSvg.style.transform = 'scale(0.85)';
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!touchActive) return;
            const touch = e.touches[0];
            const moveX = (touch.clientX - logoStartX) / 4;
            const moveY = (touch.clientY - logoStartY) / 4;
            logoSvg.style.transform = `scale(0.85) translate(${moveX}px, ${moveY}px)`;
        }, { passive: true });

        document.addEventListener('touchend', () => {
            if (!touchActive) return;
            touchActive = false;
            logoSvg.style.transition = 'transform 0.4s ease-out';
            logoSvg.style.transform = 'scale(1) translate(0, 0)';
        });
    }

    // =====================
    // Floating Particles
    // =====================
    const particlesContainer = document.getElementById('particles');

    function createParticles() {
        if (!particlesContainer) return;
        const count = window.innerWidth < 768 ? 12 : 25;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();
});
