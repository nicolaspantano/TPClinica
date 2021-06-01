import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:HomeComponent,canActivate: [GuardGuard]},
  {path:'registro',component:RegistroComponent},
  {path:'usuarios',component:UsuariosComponent,canActivate: [GuardGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
