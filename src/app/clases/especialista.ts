import { Especialidad } from "./especialidad";
import { Usuario } from "./usuario";
export class Especialista extends Usuario{

    especialidad:Especialidad;
    imagen:string;
    aprobado:boolean;

    constructor(nombre, apellido, correo, clave, edad, dni, especialidad, foto,aprobado? ){
        super(correo,clave,nombre,apellido,edad,dni,'Especialista');
        
        this.especialidad=especialidad;
        this.imagen=foto;
        if(aprobado){
            this.aprobado=aprobado;
        }
        else{
            this.aprobado=false;
        }
        

    }

}
