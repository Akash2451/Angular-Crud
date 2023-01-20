import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
employees:any;
columns: any;
api:any;
  constructor(private rest:RestService) {
    
  this.columns = [
   { header: ' Id', field: 'id' },
   { header: ' Name', field: 'employee_name' },
   { header: 'Salary', field: 'employee_salary' },
   { header: 'Age', field: 'employee_age' },
 ]; 
   }

  ngOnInit(): void {
    this.rest.getdata().subscribe(res=>{
      this.api = res;
    })
    this.getData();
  }
getData(){
  this.rest.getEmployees().subscribe((data:any)=>{
    console.log(data.data);
    this.employees = data.data;
  })
}
}
