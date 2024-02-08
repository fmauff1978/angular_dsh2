import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) { }


  login(email,password){

    this.auth.signInWithEmailAndPassword(email, password).then(logRef=>{
      console.log("Autenticado!")
      this.loadUser();
      this.router.navigate(['/'])

    }).catch(e=>{
      console.log(e);
    })
  }



  loadUser(){

    this.auth.authState.subscribe(user =>{
      localStorage.setItem('user', JSON.stringify(user))

      console.log(JSON.parse(JSON.stringify(user)))
    })
  }
}
