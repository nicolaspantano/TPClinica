import { isFromDtsFile } from '@angular/compiler-cli/src/ngtsc/util/src/typescript';
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
    //return this.listadoEspecialidades; 
    return this.refenciaALaColeccion;
  }
  TraerEspecialidadesAprobadas(){
    //return this.listadoEspecialidades; 
    let referenciaAprobadas = this.referenciaBd.collection(this.rutaDeLaColeccion, (ref) =>
    ref.where('aprobada', '==', true)
  );
   return referenciaAprobadas;
  
  }

  AgregarEspecialidad(especialidad){
    let id=this.bd.createId();
    this.bd.collection('especialidades')
    .doc(id)
    .set({
      descripcion: especialidad,
      id: id,
    });
  }



  TraerEspecialidadesByDescripcion(descripcion){
    let retorno=[];
    descripcion.forEach(element => {
      let espec = this.referenciaBd.collection(this.rutaDeLaColeccion, (ref) => ref.where('descripcion','==',element));
      retorno.push(espec);
    });
    
  
  return retorno

  }
}
