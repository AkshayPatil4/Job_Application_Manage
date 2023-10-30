import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobListComponent } from './job-list/job-list.component';
import { EditListComponent } from './edit-list/edit-list.component';

import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'job_list', component:JobListComponent},
  {path: 'edit_list/:id', component:EditListComponent},
 
  {path: 'signup', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
