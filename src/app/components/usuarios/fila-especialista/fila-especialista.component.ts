import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as firebase from 'firebase';
@Component({
  selector: '[app-fila-especialista]',
  templateUrl: './fila-especialista.component.html',
  styleUrls: ['./fila-especialista.component.css']
})
export class FilaEspecialistaComponent implements OnInit {
  @Input()unEspecialista;
  path;
  constructor(private userSvc:UsuarioService,private storage: AngularFireStorage,) { }

  validarEspecialista(usuario){
    this.userSvc.ActualizarEstadoEspecialista(usuario);
  }
  ngOnInit(): void {
    console.log("path al principio",this.unEspecialista.imagen);
    let storages = firebase.default.storage();
    let storageRef = storages.ref();
    let spaceRef = storageRef.child(this.unEspecialista.imagen);


    spaceRef.getDownloadURL().then(url => {
      console.log(url)
      this.path = url
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
