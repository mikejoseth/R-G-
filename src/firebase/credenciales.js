// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyB7_UUWPRx3QpLBqlOKO7m0OWN7EfCtfeo",
  authDomain: "michi-17e05.firebaseapp.com",
  projectId: "michi-17e05",
  storageBucket: "michi-17e05.appspot.com",
  messagingSenderId: "300230617830",
  appId: "1:300230617830:web:4d1d19b7d24dad718a6927",
  measurementId: "G-C6SGSL5X3Y"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
