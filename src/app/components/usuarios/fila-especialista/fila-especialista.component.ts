import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as firebase from 'firebase';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Especialidad } from 'src/app/clases/especialidad';
@Component({
  selector: '[app-fila-especialista]',
  templateUrl: './fila-especialista.component.html',
  styleUrls: ['./fila-especialista.component.css']
})
export class FilaEspecialistaComponent implements OnInit {
  @Input()unEspecialista;
  path;
  especialidades=[];
  constructor(private userSvc:UsuarioService,private storage: AngularFireStorage,private especSvc:EspecialidadesService) { 
    let espec = this.especSvc.TraerEspecialidades().valueChanges();
    espec.subscribe(res => {
      this.especialidades = res;
    })
  }

  validarEspecialista(usuario){
    this.userSvc.ActualizarEstadoEspecialista(usuario);
    
   usuario.especialidad.forEach(element => {
     console.log(this.especialidades);
     let filtro = this.especialidades.filter(e => e.descripcion == element);
     
     if(filtro.length==0){
       console.log(element);
       this.especSvc.AgregarEspecialidad(element);
     }
   });
  }
  ngOnInit(): void {
    let storages = firebase.default.storage();
    let storageRef = storages.ref();
    let spaceRef = storageRef.child(this.unEspecialista.imagen);


    spaceRef.getDownloadURL().then(url => {
      this.path = url;
      return url;

    });
  }


  verificarAprobado(){
    if(this.unEspecialista.rol=="Especialista"&&this.unEspecialista.aprobado==false){
      return true;
    }
    return false;
   }
 
}
