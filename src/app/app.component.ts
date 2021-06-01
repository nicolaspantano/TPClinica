import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TPClinica';

  constructor(private userSvc:UsuarioService,private router:Router){}
  verificarLogin(){
    if(localStorage.getItem('token')){
      
      return true;
    }
    return false;
  }

  Logout(){
    this.userSvc.Logout();
    Swal.fire({
      title: 'Sesion cerrada exitosamente',
      icon: 'success'
    })
    
  }
}
