import Event from '../models/event.model';
import { Observable } from 'rxjs/Rx';
import {
  HttpParams,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Response, Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class EventService {
  api_url = environment.domain;
  eventUrl = `${this.api_url}/events`;
  options;
  authToken;
  constructor(private http: HttpClient) {}

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  createEvent(event: Event): Observable<any> {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);
    console.log(this.authToken);
    return this.http.post(`${this.eventUrl}`, event, { headers: headers });
  }

  getEvents(): Observable<Event[]> {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    return this.http
      .get(`${this.eventUrl}`, { withCredentials: true, headers: headers })
      .map(res => {
        return res['events'] as Event[];
      });
  }

  getEventsbyName(name: string): Observable<Event[]> {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    let params = new HttpParams();
    params = params.append('name', name);

    return this.http
      .get(`${this.eventUrl}`, {
        params: params,
        withCredentials: true,
        headers: headers
      })
      .map(res => {
        return res['events'] as Event[];
      });
  }
  getEventsLimit(page: string): Observable<Event[]> {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    let params = new HttpParams();
    params = params.append('limit', '10');
    params = params.append('page', page);
    return this.http
      .get(`${this.eventUrl}`, {
        params: params,
        withCredentials: true,
        headers: headers
      })
      .map(res => {
        return res['events'] as Event[];
      });
  }

  getEvent(id: string): Observable<Event> {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    const getUrl = `${this.eventUrl}/${id}`;
    return this.http
      .get(getUrl, { withCredentials: true, headers: headers })
      .map(res => {
        console.log(res);
        return res['events']._id as Event;
      });
  }

  deleteEvent(id: string): any {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    const deleteUrl = `${this.eventUrl}/${id}`;
    return this.http
      .delete(deleteUrl, { withCredentials: true, headers: headers })
      .map(res => {
        return res;
      });
  }

  editEvent(id: string, event: Event): any {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    const putUrl = `${this.eventUrl}/${id}`;
    return this.http
      .put(putUrl, event, { withCredentials: true, headers: headers })
      .map(res => {
        return res;
      });
  }
}
