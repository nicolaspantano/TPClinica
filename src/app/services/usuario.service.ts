import { AuthService } from './auth.service';
import { Especialista } from './../clases/especialista';
import { Paciente } from './../clases/paciente';
import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import {AngularFirestore,AngularFirestoreCollection,} from '@angular/fire/firestore/';
import { AngularFireDatabase } from '@angular/fire/database';
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  ruteDeLaColeccionUsuarios='/usuarios';
  rutaDeLaColeccionPaciente = '/pacientes';
  rutaDeLaColeccionEspecialista = '/especialistas';
  referenciaAlaColeccionPaciente: AngularFirestoreCollection<Paciente>;
  referenciaAlaColeccionEspecialista: AngularFirestoreCollection<Especialista>;
  referenciaAlaColeccionUsuario: AngularFirestoreCollection<any>;

  referenciaBd: AngularFirestore;

  usuarios : Observable<any>;
  listaUsuarios = [];
  public usuarioActual;
  constructor(private bd: AngularFirestore, private authSvc:AuthService, private context: AngularFireDatabase) {
    this.referenciaBd = bd;
    this.referenciaAlaColeccionPaciente = bd.collection(this.rutaDeLaColeccionPaciente);
    this.referenciaAlaColeccionEspecialista = bd.collection(this.rutaDeLaColeccionEspecialista);
    this.referenciaAlaColeccionUsuario = bd.collection(this.ruteDeLaColeccionUsuarios);

    this.usuarios = this.TraerTodosUsuarios().valueChanges();
    this.usuarios.subscribe(usuarios =>{
      this.listaUsuarios = usuarios;
    },error => console.log(error));

    
    
  }

  public setUsuarioActual(user){
    this.usuarioActual=user;
  }

  BuscarUsuarioActual(){
    
      this.usuarioActual = this.listaUsuarios.filter(u => u.email == localStorage.getItem('token'));
      this.usuarioActual = this.usuarioActual[0];
    
  }
  CrearPaciente(paciente: Paciente): any {
    
    let id = this.bd.createId();
    paciente.id = id;
    return this.referenciaAlaColeccionUsuario.add({ ...paciente });
  }


  
  RegistrarEspecialista(especialista) {

    this.authSvc.GetCurrentUser().then((response: any) => {
      especialista.id=response.uid;
      const ref = this.bd.collection(`usuarios`).doc(response.uid);
      console.log(especialista);
      ref.set({...especialista});
      return true;
      });
  }

  RegistrarAdmin(paciente) {

    this.authSvc.GetCurrentUser().then((response: any) => {
      paciente.id=response.uid;
    const ref = this.bd.collection(`usuarios`).doc(response.uid);
    ref.set({...paciente});
    
    return true;
    });
    
    
  }
    
  RegistrarPaciente(paciente) {

    this.authSvc.GetCurrentUser().then((response: any) => {
      paciente.id=response.uid;
    const ref = this.bd.collection(`usuarios`).doc(response.uid);
    ref.set({...paciente});
    
    return true;
    });
    
    
  }


  ActualizarEstadoEspecialista(especialista:Usuario){
    console.log(especialista.id);
    return this.referenciaAlaColeccionUsuario.doc(especialista.id).update({
      aprobado:true
    })
    
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
    return  this.referenciaBd.collection(this.rutaDeLaColeccionEspecialista, (ref) =>
      ref.where('correo', '==', correo).where('clave', '==', clave)
    );
  } 

  public BuscarUsuarioPac(user: any) {
    return this.referenciaBd.collection(this.rutaDeLaColeccionPaciente, (ref) =>
      ref.where('correo', '==', user.correo).where('clave', '==', user.clave)
    );
  }
  
  public Logout(){
    localStorage.clear();
    this.authSvc.LogOutCurrentUser();
  }


}