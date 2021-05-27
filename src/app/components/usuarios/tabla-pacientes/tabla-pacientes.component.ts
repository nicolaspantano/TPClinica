import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.css']
})
export class TablaPacientesComponent implements OnInit {
  @Input()listaPacientes:Paciente[];
  constructor() { }

  ngOnInit(): void {
  }

}
