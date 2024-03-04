import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../modules/user';
import { throwError as observableThrowError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  databaseUrl: string = "http://localhost:5212/api/users";
  private token : string ='myChallengeToken';
  private _isLoggedIn = new BehaviorSubject(false);
  isLoggedIn = this._isLoggedIn.asObservable();
   private regisrationSuccesSubject = new BehaviorSubject<boolean>(false);
   registrationSuccess$ = this.regisrationSuccesSubject.asObservable();

  errorMessage : string = '';
   
  constructor(private http:HttpClient) {

    if(localStorage.getItem(this.token))
    {
      this._isLoggedIn.next(true);
    }
   }

   
   Signup(newUser: User) :Observable<any>{
    return this.http.post(this.databaseUrl + '/register', newUser)
      .pipe(
        tap(() => {
        this.regisrationSuccesSubject.next(true);
      }),

catchError((error: HttpErrorResponse) => {
        let errorMessage = error.error;
  
        if (error.status === 400  && error.error.message) {

       errorMessage = error.error.message;

        }
  
    return throwError(errorMessage);

      })
      );
   }
 
  


   login(email : string, password: string)
   {
     let querryParams = new HttpParams();
     querryParams = querryParams.append('email', email);
     querryParams = querryParams.append('password', password);
     const headers = new HttpHeaders({'content-type' : 'application/json'});
     return this.http.get (`${this.databaseUrl}/login`, {params: querryParams, responseType: 'text', headers})
     .pipe(tap((response) => {
      localStorage.setItem('myChallengeToken', response);
      if (response){
       
          this._isLoggedIn.next(true);  
       
      }
      else{
        this._isLoggedIn.next(false);
      }
     }));
    }

   logout(){
    localStorage.removeItem(this.token);
    this._isLoggedIn.next(false);
   }

   getCurrentUser() : Observable <any>
   {
    let reqHeaders = localStorage.getItem(this.token);
    // console.log(reqHeaders);

    return this.http.get<any>(`${this.databaseUrl}/current`).pipe(
      map((response)=>{
        return {
          ...response,
          token: localStorage.getItem(this.token),
        };
      })
    );
     
    }
    getUser(id:number): Observable<User>
    {
      return this.http.get<User>(`${this.databaseUrl}/${id}`)
    }

   private userSubject = new BehaviorSubject<string>('');
   user$ = this.userSubject.asObservable();
   setUserEmail(email: string)
   {
    this.userSubject.next(email)
   }
   }

