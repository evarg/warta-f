import { AuthService } from './../../auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router } from "@angular/router"

// Importing rxjs
// import 'rxjs/Rx';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      // Validators.required,
      // Validators.minLength(3)
    ]),
    password: new FormControl('', [
      // Validators.required,
      // Validators.minLength(6)
    ]),
  });

  @Input() error: string | null = null;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    let credencials = {
      'email': this.form.value.email,
      'password': this.form.value.password
    }

    this.authService.login(credencials).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        if (err.status === 422) {
          this.error = err.error.message
          Object.keys(err.error.errors).forEach(prop => {
            const formControl = this.form.get(prop);
            if (formControl) {
              formControl.setErrors({ serverError: err.error.errors[prop] });
            }
          });
        }
        if (err.status === 401) {
          this.error = 'Invalid email or password'
        }
      },
      complete: () => { }
    });
  }


}
