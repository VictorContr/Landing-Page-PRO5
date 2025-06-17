export const landing = document.getElementById("landing");
// Función para la animación del juego
export const animateLolo=()=> {
    const lolo = document.querySelector('.lolo');
    let pos = 1;
    
    setInterval(() => {
        lolo.parentElement.classList.remove('lolo');
        const cells = document.querySelectorAll('.game-cell:not(.wall)');
        
        // Move to a new random position
        let newPos;
        do {
            newPos = Math.floor(Math.random() * cells.length);
        } while (cells[newPos].classList.contains('wall') || cells[newPos].classList.contains('enemy'));
        
        cells[newPos].classList.add('lolo');
        pos = newPos;
    }, 3000);
}

// Función para manejar el menú móvil
export const setupMobileMenu=()=> {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    // Función para alternar el menú
    const toggleMenu=()=> {
        mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('active');
        
        // Desplazar al menú si está abierto
        if (mobileMenu.classList.contains('open')) {
            mobileMenu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // Función para cerrar el menú
    const closeMenu=()=> {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
    }

    menuToggle.addEventListener('click', toggleMenu);
    // Cerrar menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('#mobile-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

}
