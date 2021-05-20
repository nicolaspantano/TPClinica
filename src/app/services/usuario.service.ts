import { AuthService } from './auth.service';
import { Especialista } from './../clases/especialista';
import { Paciente } from './../clases/paciente';
import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import {AngularFirestore,AngularFirestoreCollection,} from '@angular/fire/firestore/';
import { AngularFireDatabase } from '@angular/fire/database';
import { Usuario } from '../clases/usuario';



@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  ruteDeLaColeccionUsuarios='/usuarios';
  rutaDeLaColeccionPaciente = '/pacientes';
  rutaDeLaColeccionEspecialista = '/especialistas';
  referenciaAlaColeccionPaciente: AngularFirestoreCollection<Paciente>;
  referenciaAlaColeccionEspecialista: AngularFirestoreCollection<Especialista>;
  referenciaAlaColeccionUsuario: AngularFirestoreCollection<Usuario>;

  referenciaBd: AngularFirestore;

  constructor(private bd: AngularFirestore, private authSvc:AuthService, private context: AngularFireDatabase) {
    this.referenciaBd = bd;
    this.referenciaAlaColeccionPaciente = bd.collection(this.rutaDeLaColeccionPaciente);
    this.referenciaAlaColeccionEspecialista = bd.collection(this.rutaDeLaColeccionEspecialista);
    this.referenciaAlaColeccionUsuario = bd.collection(this.ruteDeLaColeccionUsuarios);
  }

  CrearPaciente(paciente: Paciente): any {
    
    let id = this.bd.createId();
    paciente.id = id;
    return this.referenciaAlaColeccionUsuario.add({ ...paciente });
  }


  
  RegistrarEspecialista(especialista) {

    this.authSvc.GetCurrentUser().then((response: any) => {
      const ref = this.bd.collection(`usuarios`).doc(response.uid);
      ref.set({...especialista});
      return true;
      });
  }


    
  RegistrarPaciente(paciente) {

    this.authSvc.GetCurrentUser().then((response: any) => {
    const ref = this.bd.collection(`usuarios`).doc(response.uid);
    ref.set({...paciente});
    return true;
    });
    
    
  }




  CrearEspecialista(especialista: Especialista): any {
    let id = this.bd.createId();
    especialista.id = id;
    return this.referenciaAlaColeccionEspecialista.add({ ...especialista });
  }



  public TraerTodosPacientes() {
    return this.referenciaAlaColeccionPaciente;
  }

  public TraerTodosUsuarios() {
    return this.referenciaAlaColeccionUsuario;
  }

  public TraerTodosEspecialistas() {
    return this.referenciaAlaColeccionEspecialista;
  }


 public BuscarUsuarioEsp(user: any) {
    return this.referenciaBd.collection(this.rutaDeLaColeccionEspecialista, (ref) =>
      ref.where('correo', '==', user.correo).where('clave', '==', user.clave)
    );
  } 

  public BuscarUsuario(correo: any,clave:any) {
    return this.referenciaBd.collection(this.rutaDeLaColeccionEspecialista, (ref) =>
      ref.where('correo', '==', correo).where('clave', '==', clave)
    );
  } 

  public BuscarUsuarioPac(user: any) {
    return this.referenciaBd.collection(this.rutaDeLaColeccionPaciente, (ref) =>
      ref.where('correo', '==', user.correo).where('clave', '==', user.clave)
    );
  } 


}