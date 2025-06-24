// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const mostrarDialogo = (idDialogo) => {
  const dialogo = document.getElementById(idDialogo);
  if (dialogo) {
    dialogo.show();
    setTimeout(() => {
      dialogo.close();
    }, 3000); // Se cierra a los 3 segundos
  }
};
// Configuración de Firebase (la misma que en register y login)
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

const nombrePerfil = document.getElementById('nombrePerfil');
const correoPerfil = document.getElementById('correoPerfil');
const nombreUsuario = document.getElementById('nombreUsuario');
const correoUsuario = document.getElementById('correoUsuario');
const telefonoUsuario = document.getElementById('telefonoUsuario');
const fechaRegistro = document.getElementById('fechaRegistro');

let estaCerrandoSesion = false;

onAuthStateChanged(auth, async (usuario) => {
  if (estaCerrandoSesion) return; 

  if (!usuario) {
    window.location.replace('./login.html');
    return;
  }

  try {
    const docRef = doc(db, "usuarios", usuario.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const datosUsuario = docSnap.data();
      if (nombrePerfil) {
        nombrePerfil.innerText = datosUsuario.nombre;
      }
      if (correoPerfil) {
        correoPerfil.innerText = datosUsuario.correo;
      }
      if (nombreUsuario) {
        nombreUsuario.innerText = datosUsuario.nombre;
      }
      if (correoUsuario) {
        correoUsuario.innerText = datosUsuario.correo;
      }
      if (telefonoUsuario) {
        telefonoUsuario.innerText = datosUsuario.telefono;
      }
       if (fechaRegistro) {
        fechaRegistro.innerText = datosUsuario.fechaRegistro;
      }
    } else {
      console.log("No se encontró documento del usuario");
    }
  } catch (error) {
    console.error("Error obteniendo datos del usuario:", error);
  }
});

// Cerrar sesión
const botonCerrarSesion = document.getElementById('cerrarSesion');

if (botonCerrarSesion) {
  botonCerrarSesion.addEventListener('click', async () => {
    try {
      estaCerrandoSesion = true;
      await signOut(auth);
      console.log("Sesión cerrada");
      mostrarDialogo("hastaLuego");
      setTimeout(() => {
        window.location.replace('index.html');
      }, 3000);
      
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  });
}