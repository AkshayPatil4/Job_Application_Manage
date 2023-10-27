import { Component , OnInit } from '@angular/core';
import { Job } from '../job-list/job_model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute , Router} from '@angular/router';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  jobForm: FormGroup;
  jobId!: string;
  jobData!: Job;

  constructor(private http: HttpClient, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router){
    this.jobForm = this.formBuilder.group({
      companyName: '',
      role: '',
      date: '',
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.jobId = params['id'];
      this.fetchJobData(this.jobId);
    });
  }


  


  fetchJobData(id: string) {
    this.http
      .get<Job>('https://job-application-manager-0-default-rtdb.firebaseio.com/posts/' + id + '.json')
      .subscribe((job) => {
        this.jobData = job;
        this.populateForm(this.jobData);
      });
  }

  populateForm(job: Job) {
    this.jobForm.patchValue({
      companyName: job.companyName,
      role: job.role,
      date: job.date,
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
    // Create an object to represent the updated job data
    const updatedJobData = {
      companyName: this.jobForm.value.companyName,
      role: this.jobForm.value.role,
      date: this.jobForm.value.date,
    };

    // Make an HTTP request to update the data in the database
    this.http
      .put<Job>(
        `https://job-application-manager-0-default-rtdb.firebaseio.com/posts/${this.jobId}.json`,
        updatedJobData
      )
      .subscribe(
        (updatedJob) => {
          console.log('Job data updated successfully:', updatedJob);
          this.router.navigate(['/job_list']);
        },
        (error) => {
          console.error('Error updating job data:', error);
          // Handle the error, show a message, or implement error handling as needed
        }
      );
  }
  }

}
