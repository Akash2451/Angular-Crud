import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  constructor(
    private formbuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      fullname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      mobile: new FormControl(''),
    });
    console.log('form value:', this.signupForm);
    this.signupForm = this.formbuilder.group({
      fullname: ['', Validators.required],
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
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Employee Added Successfully',
      });
    }
  }

  signup() {
    this._http
      .post<any>('http://localhost:3000/posts', this.signupForm.value)
      .subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Employee Added Successfully',
          });
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          alert('Signup Fail!!');
          console.log(err);
        },
      });
  }
}
