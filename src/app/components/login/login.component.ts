import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:Usuario;
  usuarios: Observable<any[]>;
  listaUsuarios=[];
  flag = true;
  form:FormGroup;

  private isEmail = /\S+@\S+\.\S+/;
  constructor(private fb:FormBuilder, private router:Router, private userSrvc:UsuarioService, private authSvc:AuthService, private db:AngularFireDatabase) { 
    
    this.authSvc.LogOutCurrentUser();
  }



  ngOnInit(): void {
    this.userSrvc.Logout();
    this.initForm();
    this.usuarios = this.userSrvc.TraerTodosUsuarios().valueChanges();
    this.usuarios.subscribe(usuarios =>{
      this.listaUsuarios = usuarios;
    },error => console.log(error));
  }


  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ['', Validators.required],
    });
  }

  isValidField(field: string): string {
    const validateField = this.form.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }

  ValidarUsuario(usuario) {

    let user = this.listaUsuarios.filter(u => u.id == usuario.user.uid);
    console.log(user)
   
    if (user[0].rol == "Especialista") {
      if (user[0].aprobado == false) {
        Swal.fire({
          title: 'Lo sentimos!',
          text: 'Usted no podra ingresar hasta no ser aprobado por un administrador',
          icon: 'warning'
        })
        this.router.navigate(["/noHabilitado"]);
      }
      else {
        localStorage.setItem('rol',user[0].rol);
        console.log('habilitado')
        this.router.navigate([""]);
      }
    } else {
      localStorage.setItem('rol',user[0].rol);

      this.userSrvc.setUsuarioActual(user);
      this.router.navigate([""]);
    }

  }

  onLogin() {

    this.authSvc.Login(this.form.value.email, this.form.value.clave).then((response: any) => {

      if(response.user.emailVerified){

        this.ValidarUsuario(response);
      }else{
        Swal.fire({
          title: 'Lo sentimos!',
          text: 'Usted no podra ingresar hasta no validar su correo electronico. Por favor revise su casilla de mail',
          icon: 'warning'
        })
      }

    }).catch(error => { console.log('error', error) });
  }

  /*ValidarAdmin(usuario) {
    let userAdmin = this.listaUsuarios.filter(u => u.id == usuario.uid);
    if (userAdmin[0].perfil == "admin") {
      this.router.navigate(["/admin"]);
      this.flag = false;
    }
    else if (usuario.email == "profesional@profesional.com") {

      this.router.navigate(["/especialista"]);
      this.flag = false;
    }
    else if (usuario.email == "paciente@paciente.com") {
      this.router.navigate(["/paciente"]);
      this.flag = false;
    }

  }*/




}
