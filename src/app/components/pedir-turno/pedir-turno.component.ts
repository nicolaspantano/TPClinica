import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.css']
})
export class PedirTurnoComponent implements OnInit {

  constructor(private turnoSvc:TurnoService, private especSvc:EspecialidadesService, private userSvc:UsuarioService) { }

  ngOnInit(): void {
  }

}
