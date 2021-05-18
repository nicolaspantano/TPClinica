import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore/';
import { AngularFireAuth,AngularFireAuthModule } from '@angular/fire/auth';

import {Usuario} from '../clases/usuario'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioActual:Usuario;
  rutaDeLaColeccion = '/usuarios';
  referenciaColeccion:AngularFirestoreCollection<Usuario>;
  referenciaBd:AngularFirestore;

  constructor(private bd:AngularFirestore, public afAuth:AngularFireAuth) { 
    
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

  async Register(user:Usuario){
    try{
      return await this.afAuth.createUserWithEmailAndPassword(user.correo,user.clave);
      
    }
    catch(error){
      return true;
      switch(error.code){
        case "auth/invalid-email":
            //this.OpenToast("El email es invalido");
            break;

        case "auth/email-already-in-use":
          //this.OpenToast("Ya existe un usuario con ese email");
          break;

        case "auth/weak-password":
          //this.OpenToast("Su contraseña es muy debil");
          break;

        default:
          //this.OpenToast("Complete los campos");
          break;

      } 
    }
  }


  async send_verification(){
      let user = this.afAuth.currentUser;
      (await user).sendEmailVerification().then(function(){
        //Email sent
      }).catch(function(error){
        //An error happened
        window.alert("Error : "+ error.message);
      });
  }
}
