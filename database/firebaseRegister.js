// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

 const mostrarDialogo = (idDialogo) => {
  const dialogo = document.getElementById(idDialogo);
  if (dialogo) {
    dialogo.show();
    setTimeout(() => {
      dialogo.close();
    }, 3000); // Se cierra a los 3 segundos
  }
};

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
const auth = getAuth(app);
const db = getFirestore(app);

// Funciones de validación con funciones flecha normales
//Utilizamos test para verificar si cumple la expresión regular
const correoValido = (correo) => {
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patronCorreo.test(correo);
};

const claveValida = (clave) => {
  const patronClave = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return patronClave.test(clave);
};

// Variable para el formulario
const formularioRegister = document.querySelector('form');


// Registrar usuario
formularioRegister.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('tlf').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const clave = document.getElementById('clave').value;
  const terminos = document.getElementById('terms').checked;

   if (!nombre || !telefono || !correo || !clave) {
    console.log("Todos los campos son obligatorios");
     mostrarDialogo("dialogoCamposVacios");
     formularioRegister.reset();
    return;
  }

  if (!correoValido(correo)) {
    console.log("El correo no tiene un formato válido");
    mostrarDialogo("dialogoCorreoInvalido");
    formularioRegister.reset();
    return;
  }

  if (!claveValida(clave)) {
    console.log("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número");
    mostrarDialogo("dialogoClaveInvalida");
    formularioRegister.reset();
    return;
  }

  if (!terminos) {
    console.log("Debes aceptar los términos y condiciones");
    mostrarDialogo("dialogoTerminos");
    formularioRegister.reset();
    return;
  }

   try {
    const metodos = await fetchSignInMethodsForEmail(auth, correo);
    if (metodos.length > 0) {
      console.log(`Este correo ya está registrado con: ${metodos.join(', ')}`);
      return;
    }

    const cred = await createUserWithEmailAndPassword(auth, correo, clave);
    const usuario = cred.user;

    await setDoc(doc(db, "usuarios", usuario.uid), {
      nombre,
      telefono,
      correo,
      fechaRegistro: new Date()
    });

    console.log("Registro exitoso. Redirigiendo...");
    mostrarDialogo("dialogoRegistroExitoso");
     formularioRegister.reset();
    setTimeout(() => {
  window.location.href = './login.html';
}, 3000);

  } catch (error) {
    const codigo = error.code;

    if (codigo === 'auth/email-already-in-use') {
      console.log("El correo electrónico ya está en uso");
      mostrarDialogo("dialogoCorreoRepetido");
    } else if (codigo === 'auth/weak-password') {
      console.log("La contraseña es demasiado débil");
      mostrarDialogo("dialogoClaveInvalida");
    } else if (codigo === 'auth/invalid-email') {
      console.log("El correo electrónico no es válido");
        mostrarDialogo("dialogoCorreoInvalido");
    } else {
      console.log("Error al registrar:", error.message);
    }

      formularioRegister.reset();
  }
  
});

  

