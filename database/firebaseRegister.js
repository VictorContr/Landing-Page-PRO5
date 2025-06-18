// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Configuración de Firebase
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
const auth = getAuth();
const db = getFirestore();

// Registrar usuario
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('tlf').value;
  const correo = document.getElementById('correo').value;
  const clave = document.getElementById('clave').value;
  const terminos = document.getElementById('terms').checked;

  if (!terminos) {
    console.log("Debes aceptar los términos y condiciones");
    return;
  }

  createUserWithEmailAndPassword(auth, correo, clave)
    .then((credencialUsuario) => {
      const usuario = credencialUsuario.user;
      
      const datosUsuario = {
        nombre: nombre,
        telefono: telefono,
        correo: correo,
        fechaRegistro: new Date()
      };

      const docRef = doc(db, "usuarios", usuario.uid);
      setDoc(docRef, datosUsuario)
        .then(() => {
          console.log("Registro exitoso. Redirigiendo...");
          window.location.href = './login.html';
        })
        .catch((error) => {
          console.error("Error al guardar datos del usuario:", error);
        });
    })
    .catch((error) => {
      const codigoError = error.code;
      
      if (codigoError === 'auth/email-already-in-use') {
        console.log("El correo electrónico ya está en uso");
      } 
      else if (codigoError === 'auth/weak-password') {
        console.log("La contraseña es demasiado débil (mínimo 6 caracteres)");
      }
      else if (codigoError === 'auth/invalid-email') {
        console.log("El correo electrónico no es válido");
      }
      else {
        console.log("Error al registrar:", error.message);
      }
    });
});

  

