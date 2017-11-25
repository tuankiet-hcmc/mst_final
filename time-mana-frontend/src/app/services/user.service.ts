import User from '../models/user.model';
import Event from '../models/event.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  api_url = 'http://localhost:3000';
  usersUrl = `${this.api_url}/users`;
  constructor(private http: HttpClient) {}
  // Create User, takes a User Object
  createUser(user: User): Observable<any> {
    // returns the observable of http post request
    return this.http.post(`${this.usersUrl}`, user, {
      withCredentials: true
    });
  }

  // Read User, takes no arguments
  getUsers(): Observable<User[]> {
    return this.http
      .get(this.usersUrl, {
        withCredentials: true
      })
      .map(res => {
        // Maps the response object sent from the server
        return res['datas'].data as User[];
      });
  }

  // Read User, takes a User Name as parameter
  getUser(name: string): Observable<User[]> {
    const getUrl = `${this.usersUrl}/${name}`;
    return this.http.get(getUrl, { withCredentials: true }).map(res => {
      // Maps the response object sent from the server
      console.log(res);
      return res['data'] as User[];
    });
  }

  // Delete User, takes a User Object as parameter
  deleteUser(id: string): any {
    // Delete the object by the id
    const deleteUrl = `${this.usersUrl}/${id}`;
    return this.http
      .delete(deleteUrl, {
        withCredentials: true
      })
      .map(res => {
        return res;
      });
  }

  // Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
