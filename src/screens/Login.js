import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import firebaseApp from '../firebase/credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import '../styles/Login.css';

const auth = getAuth(firebaseApp);

function Login() {
    const firestore = getFirestore(firebaseApp);
    const [isRegistrando, setIsRegistrando] = useState(false);
    const [showTextContainer, setShowTextContainer] = useState(false);

    async function registrarUsuario(email, password, rol) {
        try {
            const infoUsuario = await createUserWithEmailAndPassword(auth, email, password);
            console.log(infoUsuario.user.uid);

            const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
            setDoc(docuRef, { correo: email, rol: rol });
        } catch (error) {
            console.error(error.message);
        }
    }

    function submitHandler(e) {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const rol = e.target.elements.rol.value;

        console.log("submit", email, password, rol);

        if (isRegistrando) {
            registrarUsuario(email, password, rol);
        } else {
            signInWithEmailAndPassword(auth, email, password);
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowTextContainer(true);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="login-container">
            <div className="form-container">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={submitHandler}>
                    <label>
                        Correo electrónico:
                        <input type="email" id="email" />
                    </label>
                    <label>
                        Contraseña:
                        <input type="password" id="password" />
                    </label>
                    <label>
                        Rol:
                        <select id="rol">
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                    </label>
                    <input
                        type="submit"
                        value={isRegistrando ? "Registrar" : "Iniciar sesión"}
                    />
                </form>
                <button onClick={() => setIsRegistrando(!isRegistrando)}>
                    {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
                </button>
            </div>

            {/* Contenedor para el título e imagen */}
            <div className="title-container">
                <img src='../img/fondo.png' alt="" />
                <h2 id="rescatandoGarritas">Rescatando  Garritas</h2>

            </div>

            {/* Contenedor para el texto y los iconos */}
            <div id='box' className={`text-container ${showTextContainer ? 'show' : ''}`}>
                <h1 className="main-title">Encuentra tu Compañero Peludo</h1>
                <p>
                    ¡Bienvenido a nuestra página de adopciones de gatitos! En este espacio, nos esforzamos por encontrar hogares amorosos para nuestros adorables amigos felinos. 🐾
                </p>
                <p>
                    Cada gatito tiene su propia historia única y está ansioso por ser parte de tu vida. Descubre a estos encantadores compañeros peludos y considera brindarles un hogar lleno de cariño y aventuras.
                </p>
                <p>
                    ¿Listo para dar el siguiente paso? Regístrate para adoptar o inicia sesión si ya eres parte de nuestra comunidad. ¡Gracias por considerar la adopción y ser parte de esta increíble iniciativa!
                </p>
                <ul className="quote-list">
                    <li>Un Hogar es Más Cálido con Patitas Peludas</li>
                    <li>Adopta un Ronroneo de Felicidad</li>
                    <li>Gatitos: Pequeñas Bolas de Pelusa y Amor</li>
                </ul>

                {/* Iconos de redes sociales */}
                <div className="social-icons">
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                </div>
            </div>
        </div>
    );
}

export default Login;
