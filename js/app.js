import { animateLolo, landing, setupMobileMenu } from "./landing.js";
import { login, register, toggleEye } from "./login.js";
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
    if (landing) {
      animateLolo();
      setupMobileMenu();
    }
    if (login || register) {
      toggleEye();
    }