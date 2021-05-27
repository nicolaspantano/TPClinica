import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Observable<any[]>;
  listaUsuarios=[];
  listaEspecialistas=[];
  listaPacientes=[];
  accion='';
  constructor(private userSvc:UsuarioService) {
    
   }

  ngOnInit(): void {
    this.usuarios = this.userSvc.TraerTodosUsuarios().valueChanges();
    this.usuarios.subscribe(usuarios =>{
      this.listaUsuarios = usuarios;
      this.listaPacientes=this.listaUsuarios.filter(u=>u.rol=="Paciente");
      this.listaEspecialistas=this.listaUsuarios.filter(u=>u.rol=="Especialista");
    },error => console.log(error));

    
    
    
  }

  tomarEspecialistaParaValidar(especialista){

  }

}
