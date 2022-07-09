import "./mystyles.scss";

//APARECE UN ERROR CUANDO SE IMPORTAN LAS FOTOS: NO LAS ENCUENTRA
//HAY QUE MONTAR UN POLLO PARA QUE FUNCIONE LA IMPORTACIÓN DE LA FOTO SIN QUE DE UN ERROR
// HAY QUE CREAR UN FICHERO: src/types/images.d.ts
// DENTRO DEL FICHERO PONER: declare module '*.jpg'; declare module '*.jpeg';
// AGREGAR EN tsconfig.json:  "typeRoots" : ["node_modules/@types", "src/types"]
// YA CON ESTO NO DA ERROR AL RENOMBRAR index.jsx A index.tsx
import foto from "./content/logo_1.png";
import foto2 from "./content/logo_2.png";


import React from "react";
import { createRoot } from "react-dom/client";
import {MiComponente} from "./MiComponente";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<MiComponente />);


console.log('Hola xxxx');

const img = document.createElement("img");
img.src= foto;
document.getElementById("imgContainer").appendChild(img);


const img2 = document.createElement("img");
img2.src= foto2;
document.getElementById("imgContainer2").appendChild(img2);