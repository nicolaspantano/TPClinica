import { Especialista } from './../../clases/especialista';
import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from './../../clases/paciente';

import { UsuarioService } from '../../services/usuario.service';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Admin } from 'src/app/clases/admin';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Observable } from 'rxjs';
import { Especialidad } from 'src/app/clases/especialidad';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @Input() admin=false;

  pacienteRegForm: FormGroup;
  adminRegForm:FormGroup;
  especialistaRegForm: FormGroup;

  public unPaciente: Paciente;
  public unEspecialista: Especialista;
  public tipo: string;
  public pathFoto: any;
  public pathFoto2: any;

  public id: any;
  public foto: any;
  public foto1: any;
  public foto2: any;
  public fotoCargada1: any;
  public fotoCargada2: any;

  correo: string;
  clave: string;

  nombre: string;
  apellido: string;

  dni: number;
  edad: number;
  obraSocial: string;

  especialidades: any;
  especialidades$:Observable<any[]>;
  especialidadesElegidas=[];
  otrasEspecialidades:string;
  arrayOtras=[];
  private isEmail = /\S+@\S+\.\S+/;



  @Output() emitRegister: EventEmitter<any> = new EventEmitter();
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioSrv: UsuarioService,
    private storage: AngularFireStorage,
    private authSVC: AuthService,
    private especSvc:EspecialidadesService
  ) {

    this.tipo = ''
  }

  ngOnInit(): void {
    if(this.router.url!='/usuarios'){
      this.usuarioSrv.Logout();

    }
    this.initForm();             
    this.especialidades$=this.especSvc.TraerEspecialidades().valueChanges();
    this.especialidades$.subscribe(especialidades => {
      this.especialidades = especialidades;
    })
    
    
  }

  CambioFotos(e, numero) {
    if (numero == 1) {
      this.foto1 = e.target.files[0];
    } else {
      this.foto2 = e.target.files[0];
    }
  }

  SubirFotos(id: string) {
    if (this.foto1) {
      this.fotoCargada1 = `/usuarios/${id}/${1}`;
      this.storage.upload(this.fotoCargada1, this.foto1);
      
    }

    if (this.foto2) {
      this.fotoCargada2 = `/usuarios/${id}/${2}`;
      this.storage.upload(this.fotoCargada2, this.foto2);
    }
  }





  onRegisterPaciente() {
    if (this.pacienteRegForm.valid) {

      
      this.nombre = this.pacienteRegForm.value.nombre;
      this.apellido = this.pacienteRegForm.value.apellido;
      this.correo = this.pacienteRegForm.value.correo;
      this.clave = this.pacienteRegForm.value.clave;
      this.dni = this.pacienteRegForm.value.dni;
      this.edad = this.pacienteRegForm.value.edad;
      this.obraSocial = this.pacienteRegForm.value.obraSocial;

      this.registrarPaciente();

    }
  }

  onRegisterAdmin() {
    if (this.adminRegForm.valid) {

      
      this.nombre = this.adminRegForm.value.nombre;
      this.apellido = this.adminRegForm.value.apellido;
      this.correo = this.adminRegForm.value.correo;
      this.clave = this.adminRegForm.value.clave;
      this.dni = this.adminRegForm.value.dni;
      this.edad = this.adminRegForm.value.edad;

      this.registrarAdmin();

    }
  }



  onRegisterEspecialista() {
    if (this.especialistaRegForm.valid) {


      this.nombre = this.especialistaRegForm.value.nombre;
      this.apellido = this.especialistaRegForm.value.apellido;
      this.correo = this.especialistaRegForm.value.correo;
      this.clave = this.especialistaRegForm.value.clave;
      this.edad = this.especialistaRegForm.value.edad;
      this.dni = this.especialistaRegForm.value.dni;

      this.arrayOtras=this.especialistaRegForm.value.otras.split(', ');
      this.especialidades=this.especialidadesElegidas.concat(this.arrayOtras);
      this.registrarEspecialista();
    }
  }




  registrarPaciente() {


    this.authSVC.Register(this.correo, this.clave).then(response => {

      this.SubirFotos(response.user.uid);

      this.id = response.user.uid;

      let paciente = new Paciente(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.obraSocial, this.fotoCargada1, this.fotoCargada2);
      this.usuarioSrv.RegistrarPaciente(paciente);
      Swal.fire({
        title: 'Registro exitoso!',
        text: 'Se le ha enviado un mail de confirmacion, por favor, revise su casilla para poder ingresar',
        icon: 'success',
        didDestroy: () => {
          
          this.router.navigateByUrl('');
        }

      })

    }).catch(error => { console.log(error); });


  }

  registrarAdmin() {


    this.authSVC.Register(this.correo, this.clave).then(response => {

      this.SubirFotos(response.user.uid);

      this.id = response.user.uid;

      let admin = new Admin(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.obraSocial, this.fotoCargada1);
      this.usuarioSrv.RegistrarAdmin(admin);
      Swal.fire({
        title: 'Registro exitoso!',
        text: 'Se le ha enviado un mail de confirmacion, por favor, revise la casilla para poder ingresar',
        icon: 'success',
        didDestroy: () => {
          
          this.initForm();
        }

      })

    }).catch(error => { console.log(error); });


  }

  registrarEspecialista() {


    this.authSVC.Register(this.correo, this.clave).then(response => {

      this.SubirFotos(response.user.uid);

      this.id = response.user.uid;
      let especialista = new Especialista(this.nombre, this.apellido, this.correo, this.clave, this.edad, this.dni, this.especialidades,this.fotoCargada1);
      this.usuarioSrv.RegistrarEspecialista(especialista);

      Swal.fire({
        title: 'Registro exitoso!',
        text: 'Se le ha enviado un mail de confirmacion, por favor, revise su casilla para poder ingresar. Ademas como especialista debe aguardar que un administrador lo valide.',
        icon: 'success',
        didDestroy: () => {
          this.router.navigateByUrl('');
        }

      })

    }).catch(error => { console.log(error); });

  }


  isValidPaciente(field: string): string {
    const validateField = this.pacienteRegForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }

  isValidAdmin(field: string): string {
    const validateField = this.adminRegForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }


  isValidEspecialista(field: string): string {
    const validateField = this.especialistaRegForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }

  private initForm(): void {
    this.pacienteRegForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      obraSocial: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required]]
    });


    this.especialistaRegForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      otras:['']
      
    });

    this.adminRegForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required]]
    });
  }


  public onMouseDown(event: MouseEvent, item) {
    event.preventDefault();
    event.target['selected'] = !event.target['selected'];
    if(event.target['selected']) {
      this.especialidadesElegidas.push(item.descripcion);
      
    } else {
      let index = this.especialidadesElegidas.indexOf(item.descripcion);
      if(index > -1) {
          this.especialidadesElegidas.splice(index,1);
      }
    }
  }

  /*alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: text
    })
  }

*/
}