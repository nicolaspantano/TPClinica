import { Component, Input, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.css']
})
export class TablaEspecialistasComponent implements OnInit {
  @Input()listaEspecialistas:Especialista[];
  constructor() { }

  ngOnInit(): void {
  }

}
