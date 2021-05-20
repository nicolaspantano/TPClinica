import { Usuario } from "./usuario";

export class Paciente extends Usuario {
    obraSocial:string;
    imagen1:string;
    imagen2:string;

    constructor(nombre, apellido, correo, clave, edad, dni, obraSocial, foto1, foto2) {

        super(correo,clave,nombre,apellido,edad,dni,'Paciente');
        this.imagen1=foto1;
        this.imagen2=foto2;
        this.obraSocial=obraSocial;

    
    
    
    }
}

