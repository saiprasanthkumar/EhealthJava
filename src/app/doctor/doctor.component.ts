import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  dataSource = [];
  displayedColumns: string[] = ['id' ,'name', 'description', 'book'  ];


  constructor(public userService: UserService ,private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/view/doctor').subscribe((data) => this.responseSuccess(data),
            (err) => alert (err.error.message)
            );
  }

  responseSuccess(data) {
    this.dataSource  = data;
  }

  updateDoctor(element) {
    this.http.post('/update-doctor' , {
      id: element.id,
      name: element.name,
      description: element.description,
    }).subscribe((doc) => this.doctorCreated(doc),
            (err) => alert (err.error.message)
            );
  }

  doctorCreated(doc) {
      alert('Doctor details are updated');
  }
}
