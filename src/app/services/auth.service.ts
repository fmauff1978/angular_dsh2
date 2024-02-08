import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private auth: AngularFireAuth, private router: Router) { }


  login(email,password){

    this.auth.signInWithEmailAndPassword(email, password).then(logRef=>{
      console.log("Autenticado!")
      this.loadUser();
      this.loggedIn.next(true)

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


  logOut(){

    this.auth.signOut().then(()=>{

      console.log("desconectado")
      localStorage.removeItem('user')
      this.loggedIn.next(false)
      this.router.navigate(['/login'])
    })
  }

  isLoggedin(){

    return this.loggedIn.asObservable();
  }
}
