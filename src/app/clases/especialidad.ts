export class Especialidad {
    descripcion:string;
    aprobada:boolean;
    id;
    constructor(descripcion,aprobada?){
        this.descripcion=descripcion;
        this.aprobada=false;
        this.aprobada=aprobada;
    }
}
