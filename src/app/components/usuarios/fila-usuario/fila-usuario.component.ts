import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-fila-usuario',
  templateUrl: './fila-usuario.component.html',
  styleUrls: ['./fila-usuario.component.css']
})
export class FilaUsuarioComponent implements OnInit {

  @Input()unUsuario:Usuario;
  @Output()especialistaSeleccionado:EventEmitter<any>=new EventEmitter<any>();
  constructor(private userSvc:UsuarioService) { }

  ngOnInit(): void {
  }

  validarEspecialista(usuario:Usuario){
    this.userSvc.ActualizarEstadoEspecialista(usuario);
  }

}
