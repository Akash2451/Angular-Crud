import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from './dashboard/dashboard.model';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  addEmpURL: string;
  getEmpURL: string;
  updateEmpURL: string;
  deleteEmpURL: string;
  constructor(private http: HttpClient) {
    this.addEmpURL = 'http://localhost:3000/posts';
    this.getEmpURL = 'http://localhost:3000/posts';
    this.updateEmpURL = 'http://localhost:3000/posts/';
    this.deleteEmpURL = 'http://localhost:3000/posts';
  }

  addEmployee(emp: EmployeeModel): Observable<EmployeeModel> {
    return this.http.post<EmployeeModel>(this.addEmpURL, emp);
  }

  getAllEmployee(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.getEmpURL);
  }

  updateEmployee(empID: any, emp: EmployeeModel): Observable<EmployeeModel> {
    return this.http.put<EmployeeModel>(this.updateEmpURL + empID, emp);
  }

  deleteEmployee(emp: EmployeeModel): Observable<EmployeeModel> {
    return this.http.delete<EmployeeModel>(this.deleteEmpURL + '/' + emp.id);
  }
}



