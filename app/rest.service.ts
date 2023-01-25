import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  url = 'https://dummy.restapiexample.com/api/v1/employees';

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get(this.url);
  }

  getdata() {
    return this.http.get('http://172.16.3.8:4100/webapi/User/GetUser');
  }

  getDetail() {
    return this.http.get('http://172.16.3.8:4100/webapi/menu/getMenus');
  }

  getCustomersLarge() {
    return this.http.get<any>('http://172.16.3.8:4100/webapi/menu/getMenus');
  }

  getProducts(){
    return this.http.get<any>(`http://172.16.3.8:4100/webapi/menu/getMenus`)
     }
}
