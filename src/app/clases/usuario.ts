export class Usuario {

    id: string;
    correo: string;
    clave: string;
    nombre:string;
    apellido:string;
    edad:string;
    dni:number;
    rol:string;

    constructor(correo,clave,nombre,apellido,edad,dni,rol){
        this.correo=correo;
        this.clave=clave;
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
        this.dni=dni;
        this.rol=rol;
    }
}

