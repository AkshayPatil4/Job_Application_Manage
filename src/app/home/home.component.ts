import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  jobForm!: FormGroup;
  post = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.jobForm = new FormGroup({
      companyName: new FormControl(null, { validators: [Validators.required] }),
      role: new FormControl(null, { validators: [Validators.required] }),
      date: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) {
      return;
    } else {
      const formData = this.jobForm.value;
      this.post = {
        companyName: formData.companyName,
        role: formData.role,
        date: formData.date,
      };
      this.http.post(
        'https://job-application-manager-0-default-rtdb.firebaseio.com/posts.json',
        this.post
      ).subscribe(responseData =>{
        console.log(responseData);
      });
    }

    this.jobForm.reset();
    this.jobForm.markAsPristine();
    this.jobForm.markAsUntouched();

    console.log(this.jobForm);
  }
}
