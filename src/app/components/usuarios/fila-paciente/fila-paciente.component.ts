import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as firebase from 'firebase';

@Component({
  selector: '[app-fila-paciente]',
  templateUrl: './fila-paciente.component.html',
  styleUrls: ['./fila-paciente.component.css']
})
export class FilaPacienteComponent implements OnInit {

  @Input()unPaciente;
  path1;
  path2;
  constructor(private userSvc:UsuarioService,private storage: AngularFireStorage,) { }

  ngOnInit(): void {
    let storages = firebase.default.storage();
    let storageRef = storages.ref();
    let spaceRef = storageRef.child(this.unPaciente.imagen1);


    spaceRef.getDownloadURL().then(url => {
      console.log(url)
      this.path1 = url
      return url;

    });

    spaceRef=storageRef.child(this.unPaciente.imagen2);

    spaceRef.getDownloadURL().then(url => {
      console.log(url)
      this.path2 = url
      return url;

    });
  }

}
