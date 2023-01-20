import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { min } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  submitted = false;
  constructor(
    private formbuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginform = this.formbuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
    // this.loginform = this.formbuilder.group({
    //   email: [''],
    //   password: [''],
    // });
  }

  get f() {
    return this.loginform.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginform.invalid) {
      return;
    }
  }
  login() {
    // this._http.get<any>('http://localhost:3000/signupusers');

    this._http.get<any>('http://localhost:3000/posts').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginform.value.email &&
            a.password === this.loginform.value.password
          );
        });
        if (user) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successfull',
          });
          
          this.router.navigate(['home/dashboard']);
          this.loginform.reset();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid Username or Password!!',
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong!!',
        });
      }
    );
  }
}
