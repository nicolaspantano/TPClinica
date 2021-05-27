import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Especialidad } from '../clases/especialidad'
@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  listadoEspecialidades=[];
  especialidades:Observable<any>;
  rutaDeLaColeccion='especialidades';
  refenciaALaColeccion:AngularFirestoreCollection<Especialidad>;
  referenciaBd;
  constructor(private bd:AngularFirestore) { 
    this.refenciaALaColeccion=bd.collection(this.rutaDeLaColeccion);
    this.referenciaBd=bd;
    this.especialidades = this.refenciaALaColeccion.valueChanges();
    this.especialidades.subscribe(especialidades => {
      this.listadoEspecialidades=especialidades;
    },error => console.log(error));
  }

  TraerEspecialidades(){
    return this.listadoEspecialidades; 
  }

  AgregarEspecialidad(especialidad:Especialidad){
    especialidad.id=this.bd.createId();
    this.refenciaALaColeccion.add({...especialidad});
  }

  ValidarEspecialidad(especialidad:Especialidad){
    let espec = this.referenciaBd.collection(this.rutaDeLaColeccion, (ref) =>
    ref.where('descripcion', '==', especialidad.descripcion)
  );
    this.refenciaALaColeccion.doc(espec.uid).update({aprobada:true});
  }
}
