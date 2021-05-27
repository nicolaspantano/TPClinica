import { Usuario } from "./usuario";

export class Admin extends Usuario {

    imagen1:string;


    constructor(nombre, apellido, correo, clave, edad, dni, obraSocial, foto1) {

        super(correo,clave,nombre,apellido,edad,dni,'Admin');
        this.imagen1=foto1;
    }
}
