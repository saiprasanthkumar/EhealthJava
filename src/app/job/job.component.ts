import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  jobId = '';
  jobInfo = '';
  companyInfo = '';
  jobsApplied = [];

  displayedColumns: string[] = 
  ['jobId', 'jobInfo', 'companyInfo'];

  displayedJobColumns: string[] = ['userName','jobId'];

  dataSource = [];
  appliedJobdataSource = [];

  constructor(public userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/view/jobs').subscribe((data) => this.responseSuccess(data),
    (err) => alert (err.error.message)
    );
    this.http.get('/apply/jobs').subscribe((data) => this.applyJobSuccess(data),
    (err) => alert (err.error.message)
    );
  }

  applyJobSuccess(data) {
    this.jobsApplied = data;
    this.appliedJobdataSource = data;

  }

  responseSuccess(data) {
      this.dataSource = data;
      this.jobId = '';
      this.jobInfo = '';
      this.companyInfo = '';
  }

  createJob() {
    this.http.post('/add/jobs', {
      jobId : this.jobId,
      jobInfo: this.jobInfo,
      companyInfo: this.companyInfo
    })
    .subscribe((data) => this.responseSuccess(data),
    (err) => alert (err.error.message)
    );
  }
  applyJob(jobId) {
    this.http.put('/apply/jobs', {
      jobId : jobId,
      userName: this.userService.userName
    })
    .subscribe((data) => this.applyJobSuccess(data),
    (err) => alert (err.error.message)
    );
  }

}
