import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private as: AuthService){}


  ngOnInit(): void{


  }

  onSubmit(formValue){

    console.log(formValue)
    this.as.login(formValue.email, formValue.password)


  }

}
