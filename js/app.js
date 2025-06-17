import { landing, login } from "./login.js";
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'ge-blue': '#1E90FF',
            'ge-pink': '#FF69B4',
            'ge-green': '#2ECC71',
            'ge-gray': '#555555',
            'ge-yellow': '#F1C40F',
            'ge-dark': '#222222'
          },
          fontFamily: {
            'press-start': ['"Press Start 2P"', 'cursive'],
            'vt323': ['VT323', 'monospace'],
            'courier': ['Courier Prime', 'monospace']
          },
          boxShadow: {
            'ge': '4px 4px 0px rgba(0,0,0,0.3)',
          }
        }
      }
    }
    document.addEventListener('DOMContentLoaded', function() {
    if (landing) {
    // Simple animation for the game screen

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
                const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            hamburger.classList.toggle('active');
            
            // Desplazar al menú si está abierto
            if (mobileMenu.classList.contains('open')) {
            mobileMenu.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const menuLinks = document.querySelectorAll('#mobile-menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('active');
            });
        });
        
        // Animación suave para todos los enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
                });
            }
            });
        });
    }
    if (login) {
        const togglePassword = document.querySelector('#togglePassword');
                const password = document.querySelector('#clave');
                
                togglePassword.addEventListener('click', function() {
                    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                    password.setAttribute('type', type);
                    
                    // Cambiar el icono del ojo
                    const eyeIcon = this.querySelector('svg');
                    if (type === 'password') {
                        eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
                    } else {
                        eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />';
                    }
                });
    }
});