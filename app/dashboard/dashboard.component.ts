import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { EmployeeModel } from './dashboard.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService],
})
export class DashboardComponent implements OnInit {
  // public employees: any;
  formValue!: FormGroup;
  submitted = false;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  empList: any;
  EmployeeID: any;

  constructor(
    private api: PostService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.getAllEmployee();
    this.formValue = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      password: [''],
      salary: [''],
    });

    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      salary: ['', Validators.required],
    });
  }
  get f() {
    return this.formValue.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formValue.invalid) {
      return;
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Employee Added Successfully',
      });
    }
  }

  // Add//

  addEmployee() {
    console.log(this.formValue);
    this.employeeModelObj.id = this.formValue.value.id;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.password = this.formValue.value.password;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.addEmployee(this.employeeModelObj).subscribe(
      (res) => {
        // this.formValue.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: ' Employee Added Successfully!! ',
        });
        console.log(res);
        this.getAllEmployee();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: ' invalid ',
        });

        console.log(err);
      }
    );
  }

  //get All//

  getAllEmployee() {
    this.api.getAllEmployee().subscribe(
      (res) => {
        this.empList = res;
        this.formValue.reset();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong!!',
        });

        console.log(err);
      }
    );
  }
  editEmployee(emp: EmployeeModel) {
    console.log('emp', emp);
    this.EmployeeID = emp.id;
    //this.formValue.controls['id'].setValue(emp.id);
    this.formValue.controls['firstName'].setValue(emp.firstName);
    this.formValue.controls['lastName'].setValue(emp.lastName);
    this.formValue.controls['email'].setValue(emp.email);
    this.formValue.controls['mobile'].setValue(emp.mobile);
    this.formValue.controls['password'].setValue(emp.password);
    this.formValue.controls['salary'].setValue(emp.salary);
  }

  // update//

  updateEmployee() {
    // this.EmployeeID = this.formValue.value.id;
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.password = this.formValue.value.password;
    this.employeeModelObj.salary = this.formValue.value.salary;

    console.log('this.employeeModelObj', this.employeeModelObj);

    this.api.updateEmployee(this.EmployeeID, this.employeeModelObj).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated successfully',
        });

        this.getAllEmployee();
        console.log(res);
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong!!',
        });

        console.log(err);
      }
    );
  }

  // delete//
  deleteEmployee(emp: EmployeeModel) {
    var result = confirm("Are you sure to delete?");
    if(result){
      this.api.deleteEmployee(emp).subscribe(
        (res) => {
          console.log(res);
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Employee Deleted Successfully',
          });
  
          this.getAllEmployee();
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong!!',
          });
  
          console.log(err);
        }
      );
    }
}
    
  }
  
 
