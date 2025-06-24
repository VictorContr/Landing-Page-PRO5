// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


const mostrarDialogo = (idDialogo) => {
  const dialogo = document.getElementById(idDialogo);
  if (dialogo) {
    dialogo.show();
    setTimeout(() => {
      dialogo.close();
    }, 3000); // Se cierra a los 3 segundos
  }
};
// Configuración de Firebase (la misma que en register)
const firebaseConfig = {
  apiKey: "AIzaSyAy3cfWU67kHJPztxUCRsycWqGeCSu4GaI",
  authDomain: "login-progv-proyecto-jc-vc.firebaseapp.com",
  projectId: "login-progv-proyecto-jc-vc",
  storageBucket: "login-progv-proyecto-jc-vc.appspot.com",
  messagingSenderId: "719108033580",
  appId: "1:719108033580:web:2bb76b1e1004c5a5789589"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Variable para el formulario
const formularioLogin = document.querySelector('form');


// Iniciar sesión
formularioLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const correo = document.getElementById('correo').value.trim();
  const clave = document.getElementById('clave').value;

  signInWithEmailAndPassword(auth, correo, clave)
    .then(() => {
      console.log("Inicio de sesión exitoso. Redirigiendo...");
       mostrarDialogo("dialogoLoginExitoso");
       formularioLogin.reset();
      setTimeout(() => {
        window.location.href = './lolo.html';
      }, 3000)
    })
    .catch((error) => {
     console.log("Correo o contraseña incorrectos");
      mostrarDialogo("dialogoDatosInvalidos");
      formularioLogin.reset();
    });
});