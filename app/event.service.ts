import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { eventmodel } from './calendar/add-event/addevent.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  addEventURL: string;
  getEventURL: string;
  deleteEventURL: string;
  updateEventURL: string;
  emp: any;
  constructor(private http: HttpClient) {
    this.addEventURL = 'http://localhost:3000/comments';
    this.getEventURL = 'http://localhost:3000/comments';
    this.deleteEventURL = 'http://localhost:3000/comments/';
    this.updateEventURL = 'http://localhost:3000/comments/';
  }

  addEvent(emp: eventmodel): Observable<eventmodel[]> {
    return this.http.post<eventmodel[]>(this.addEventURL, emp);
  }
  getallEvents(): Observable<eventmodel[]> {
    return this.http.get<eventmodel[]>(this.getEventURL);
  }

  updateEvent(empID: any, emp: eventmodel): Observable<eventmodel> {
    return this.http.put<eventmodel>(this.updateEventURL + empID, emp);
  }

  deleteEvent(emp: eventmodel): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: emp,
    };
    return this.http.delete(
      'http://localhost:3000/comments/' + emp.id,
      options
    );
  }
}
