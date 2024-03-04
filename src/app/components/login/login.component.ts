import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';
  errorMessage : string ='';

  constructor(private userService : UserService, private router : Router)
  {

  }
  ngOnInit(): void {
    
  }
  login(){
    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        // this.userService.setUserEmail(response.data.user.email)
        this.router.navigateByUrl('/myDashboard');
      },
      (error) => {
        console.error('Login Error:', error);
        if (error.status === 401) {
         this.errorMessage = "Invalid Email or password, Please try again.";
        } 
        else {
         this.errorMessage = 'Login Failed. please try again later';
        }
        this.router.navigateByUrl('/login');
      }
    );
    
  }
}

