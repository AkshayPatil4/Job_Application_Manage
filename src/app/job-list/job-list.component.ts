import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';
import { Job } from './job_model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  data: Job[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.onFetchPost();
    
  }

  onFetchPost() {
    this.http
      .get<{ [key: string]: Job}>(
        'https://job-application-manager-0-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map(responseData => {
          const postArray: Job[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        })
      )
      .subscribe((posts) => {

        this.data = posts;
        this.dataSource.data= this.data;
        

      });

      
  }

  displayedColumns: string[] = ['companyName', 'role', 'date',];
  dataSource = new MatTableDataSource(this.data);

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
} 
}
