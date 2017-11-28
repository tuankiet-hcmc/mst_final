import User from '../models/user.model';
import Event from '../models/event.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  api_url = environment.domain;
  usersUrl = `${this.api_url}/auth`;
  authToken;
  user;
  constructor(private http: HttpClient) { }
  // Create User, takes a User Object
  register(user: User): Observable<any> {
    // returns the observable of http post request
    return this.http.post(`${this.usersUrl}/signup`, user, {
      withCredentials: true
    });
  }

  // Read User, takes no arguments
  login(user: User): Observable<any> {
    return this.http.post(`${this.usersUrl}/signin`, user, {
      withCredentials: true
    });
  }
  // Function to store user's data in client local storage
  storeUserData(token, user) {
    localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }
  // Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  logout() {
    console.log(13212312312);
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }
  // Function to check if user is logged in
  loggedIn() {
    return tokenNotExpired();
  }

}
