import React from 'react';
import '../styles/usu.css';
import catImage1 from '../img/fondo.png';
import catImage2 from '../img/logo.png';
// ... importa las imágenes de los gatos aquí

function UserView() {
    const cats = [
        { name: "Ralla", description: "juguetona y dormilona, una gran compañera", image: catImage1 },
        { name: "Cruela", description: "tranquila y curiosa, no hace destrosos edad: 2 años", image: catImage2 },
        // ... agrega más gatos aquí
    ];

    return (
        <div>
            <div id="backgroundImageContainer"></div>
            <div id="adoptTextContainer">
                <h1 id="adoptText">Adopta</h1>
                {cats.map((cat, index) => (
                    <div key={index} className="cat-container">
                        <div className="cat-image-container">
                            <img src={cat.image} alt={`Cute Cat ${cat.name}`} className="cat-image"/>
                        </div>
                        <div className="cat-info-container">
                            <div className="cat-info">
                                <h2>{cat.name}</h2>
                                <p>{cat.description}</p>
                            </div>
                            <button className="adopt-button">Adóptame</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserView;

