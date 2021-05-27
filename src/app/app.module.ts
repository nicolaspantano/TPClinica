import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TablaEspecialistasComponent } from './components/usuarios/tabla-especialistas/tabla-especialistas.component';
import { TablaPacientesComponent } from './components/usuarios/tabla-pacientes/tabla-pacientes.component';
import { FilaEspecialistaComponent } from './components/usuarios/fila-especialista/fila-especialista.component';
import { FilaPacienteComponent } from './components/usuarios/fila-paciente/fila-paciente.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    UsuariosComponent,
    TablaEspecialistasComponent,
    TablaPacientesComponent,
    FilaEspecialistaComponent,
    FilaPacienteComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
