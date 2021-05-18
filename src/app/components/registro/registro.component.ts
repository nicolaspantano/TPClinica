import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formPaciente: FormGroup;
  formEspecialista: FormGroup;
  unPaciente:Paciente;
  pathFoto: any;
  formActual="Paciente";
  private isEmail =/\S+@\S+\.\S+/;

  constructor( private fb: FormBuilder,private usuarioSrv:UsuarioService,private storage:AngularFireStorage ) {
    this.crearFormulario();
  }


  ngOnInit(): void {
    
  }

  
  crearFormulario() {
    
    /*this.formPaciente = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      dni:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      edad: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required]],
      foto1: ['', [Validators.required]],
      foto2: ['', [Validators.required]]
  });*/

  this.formPaciente = this.fb.group({
    nombre:new FormControl( '', [Validators.required, Validators.minLength(2)]),
    apellido:new FormControl( '', [Validators.required, Validators.minLength(2)]),
    dni:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
    edad:new FormControl( '', [Validators.required]),
    email:new FormControl( '', [Validators.required,Validators.pattern(this.isEmail)]),
    password:new FormControl( '', [Validators.required]),
    foto1:new FormControl( '', [Validators.required]),
    foto2:new FormControl( '', [Validators.required])
});
console.log(this.formPaciente)
  }

  isValidPaciente(field: string): string {
    const validateField = this.formPaciente.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
      ? 'is-valid'
      : '';
  }

  isValidEspecialista(field: string): string {
    const validateField = this.formEspecialista.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
      ? 'is-valid'
      : '';
  }

  onUpload($event) {
    console.log($event)
    const file = $event.target.files[0];
    const filePath = 'upload/imagen.png';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath,file);
    this.guardarReferencia(filePath);
    
  }

  guardarReferencia(pReferencia: string) {
    let storages = firebase.default.storage();
    let storageRef = storages.ref();
    let spaceRef = storageRef.child(pReferencia);
    spaceRef.getDownloadURL().then(url => {
      this.pathFoto = url
    });
  }

  registrarPaciente(){
    //if (this.formPaciente.valid) {


      this.unPaciente.nombre = this.formPaciente.value.nombre;
      this.unPaciente.apellido = this.formPaciente.value.apellido;
      this.unPaciente.correo = this.formPaciente.value.correo;
      this.unPaciente.clave = this.formPaciente.value.clave;
      this.unPaciente.dni = this.formPaciente.value.dni;
      this.unPaciente.edad = this.formPaciente.value.edad;
      this.unPaciente.obraSocial = this.formPaciente.value.obraSocial;

      console.log(this.unPaciente);
      //this.usuarioSrv.CrearPaciente(this.unPaciente);
      /*this.usuarioSrv
        .BuscarUsuarioPac(this.unPaciente)
        .valueChanges()
        .subscribe((result) => {
          if (result.length == 1) {
            console.log('ERROR usuario ya registrado');
          } else {
            localStorage.setItem('token', this.unPaciente.correo);
            this.usuarioSrv.CrearPaciente(this.unPaciente);
            this.router.navigateByUrl('home');
            console.log('Usuario registrado!');
          }
        });*/
      
    //}
  }




}
