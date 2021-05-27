import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userSvc:UsuarioService) { }

  ngOnInit(): void {
  }

  mostrar(){
    console.log(this.userSvc.usuarioActual);
  }

}
