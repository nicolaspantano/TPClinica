import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  @Input()listaUsuarios:Usuario[];
  @Output() especialistaSeleccionado:EventEmitter<any>=new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  validarEspecialista(especialista){
    this.especialistaSeleccionado.emit(especialista);
  }

}
