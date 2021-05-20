
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  emailSent = false;
  error: string;

  user = this.afAuth.authState.pipe(
    map(authState =>{
      if(!authState){
        return null;
      }else{
        return authState.email
      }
    })
  );

  constructor(public  afAuth: AngularFireAuth, private router: Router, private context: AngularFireDatabase) { }

  Login(email: string, password: string) {

    return new Promise((resolve, rejected) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(response => {
        resolve(response);
      }, (error: any) => {
        console.log(error);
        switch (error.code) {
          case "auth/user-not-found":
            rejected("El usuario no existe");
            break;
          case "auth/invalid-email":
            rejected("email invalido");
            break;
          case "auth/wrong-password":
            rejected("clave incorrecta");
            break;
          default:
            rejected("ERROR");
            break;
        }
      });

    });

  }
  //VIDOE YOOUTUBE
  /*Register(email:string, password:string){
    
    this.afAuth.createUserWithEmailAndPassword(email, password)
     .then((user)=>{
       // email verification
       this.afAuth.user.subscribe( x => {
         if(x){
           x.sendEmailVerification()
           
           .then(()=>{
             console.log("Email verification sent");
             
           })
           .catch(err => {
             console.log("Error: ", err);
           })
         
         }
       })

       
       console.log(user.user.email)
       this.error = "";
       this.router.navigate(["/private"]);
     })
     .catch((err)=>{

        console.log("An error ocurred");
      this.error = err.message;
     })
 }

 /*Login(email:string, password:string){
  this.afAuth.signInWithEmailAndPassword(email, password)
  .then((user)=>{
    console.log(user.user.email);
    this.error = "";
    this.router.navigate(["/private"]);
  })
  .catch((err)=>{
    console.log("An error ocurred");
    this.error = err.message;
  })
}*/



  Register(email: string, password: string) {

    return new Promise<any>((resolve, rejected) => {
      this.afAuth.createUserWithEmailAndPassword(email, password).then((response: any) => {
        this.EnviarMailDeVerificacion();
        resolve(response);
      }, (error: any) => {
        switch (error.code) {
          case "auth/weak-password":
            rejected("clave muy corta,minimo 6 caracteres");
            break;
          case "auth/invalid-email":
            rejected("email invalido");
            break;
          case "auth/wrong-password":
            rejected("clave invalida");
            break;
          case "auth/email-already-in-use":
            rejected("El correo ya se encuentra tomado");
            break;
          default:
            rejected("ERROR");
            break;
        }
      });
    });
  }

  async EnviarMailDeVerificacion(){
    return await (await this.afAuth.currentUser).sendEmailVerification(); 
  }

  GetCurrentUser() {
    return this.afAuth.currentUser;
  }

  LogOutCurrentUser() {
    this.afAuth.signOut();
  }



}