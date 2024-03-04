import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Buck List';
  
  isloggedIn: boolean = false;
  currentuser: any;
  isSticky : boolean = false;

  constructor(private userService: UserService, private router: Router){}
 @HostListener('window:scroll', ['$event'])
 handleScroll()

 {
  const scrollPosition = window.pageYOffset;
  this.isSticky = scrollPosition > 50;
 }
  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((loggedIn) => {
      this.isloggedIn = loggedIn;
      if (loggedIn) {
        const jwtstring = localStorage.getItem('myChallengeToken');
        // console.log('Token:', jwtstring);
  
        if (jwtstring !== null) {
          try {
            const decodedToken: any = jwtDecode(jwtstring);
            // console.log('Decoded Token:', decodedToken);
  
            if (decodedToken && decodedToken.unique_name) {
              // console.log('User Name:', decodedToken.unique_name);
              this.currentuser = { name: decodedToken.unique_name };
            } else {
              console.error('Invalid JWT structure:', decodedToken);
            }
          } catch (error) {
            console.error('Error decoding JWT:', error);
          }
        } else {
          this.currentuser = null;
        }
      }
    });
  }

  logout()
  {
    this.userService.logout();
  }
}
