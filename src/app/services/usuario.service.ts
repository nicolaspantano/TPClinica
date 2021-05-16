import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore/';

import {Usuario} from '../clases/usuario'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  rutaDeLaColeccion = '/usuarios';
  referenciaColeccion:AngularFirestoreCollection<Usuario>;
  referenciaBd:AngularFirestore;

  constructor(private bd:AngularFirestore) { 
    this.referenciaBd = bd;
    this.referenciaColeccion = bd.collection(this.rutaDeLaColeccion);
  }

  Crear(usuario: Usuario): any {
    return this.referenciaColeccion.add({ ...usuario });

  }

  public TraerTodos() {
    return this.referenciaColeccion;
  }


  public BuscarUsuario(user: Usuario) {
    return this.referenciaBd.collection(this.rutaDeLaColeccion, ref => ref.where("correo", "==", user.correo).where("clave", "==", user.clave));

   

  }
}
