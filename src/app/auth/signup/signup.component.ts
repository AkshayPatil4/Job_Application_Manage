import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  constructor(private http: HttpClient) {}

  signupForm!: FormGroup;
  form = {};

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });
  }
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    } else {
      const formData = this.signupForm.value;
      this.form = {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true,
      };
      this.http
        .post<authresponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAecRGdf8AvP-I0T8c6gv0qpFX6cBJYYfc',
          this.form
        )
        .subscribe((responseData) => {
          console.log(responseData);
        });

        
    }
    this.signupForm.reset();
    
  }
}
