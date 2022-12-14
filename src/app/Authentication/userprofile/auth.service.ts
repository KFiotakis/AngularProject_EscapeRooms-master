import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from './userModel';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  API_URL: string = 'https://localhost:44368';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient,public router: Router){}

  // https://localhost:44368/api/account/register
  register(user: User): Observable<any> {

    return this.httpClient.post(`${this.API_URL}/api/account/register`, user).pipe(
        catchError(this.handleError)
        
    )
    
  }

  login(user: User) {
    return this.httpClient.post<any>(`${this.API_URL}/api/account/externallogin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['users/profile/' + res.msg._id]);
        })
        console.log(res.token)
        console.log(user)
      })
      
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['users/login']);
    }
  }

  getUserProfile(id:string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users/profile/${id}`, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}