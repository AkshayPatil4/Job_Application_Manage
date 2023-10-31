import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subject, tap } from 'rxjs';
import { User } from '../user-model';
import { AuthService } from './auth.service';

interface authresponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}
  isLoginMode = true;
  signupForm!: FormGroup;

  error: string = '';

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });
  }
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    const formData = this.signupForm.value;
    let authObs: Observable<authresponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(formData.email, formData.password);
    } else {
      authObs = this.authService.onSignup(formData.email, formData.password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
      },
      (errorMessage) => {
        this.error = errorMessage;
      }
    );

    this.signupForm.reset();
  }
}
