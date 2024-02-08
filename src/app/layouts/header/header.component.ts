import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userEmail: string;
  isLoggedIn$: Observable<boolean>;

  constructor( private as: AuthService){}
  ngOnInit(): void {

   this.userEmail = JSON.parse(localStorage.getItem('user')).email;

   this.isLoggedIn$ = this.as.isLoggedin();
    
  }

  onLogOut(){

    this.as.logOut()
  }

}
