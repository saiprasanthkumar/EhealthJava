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
  dataSourceAppointment ;
  displayedColumns: string[] = ['id' ,'name', 'description', 'book'  ];
  displayedColumnsAppointment: string[] = ['patientId' , 'doctorId' , 'timing'];


  constructor(public userService: UserService ,private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/view/doctor').subscribe((data) => this.responseSuccess(data),
            (err) => alert (err.error.message)
            );
            this.http.get('/view/appointment').subscribe((data) => {
                this.dataSourceAppointment = data;
            });
  }

  responseSuccess(data) {
    this.dataSource  = data;
  }

  updateDoctor(element) {
    console.log(this.userService.userType)
    if(this.userService.userType!== 'patient'){
    this.http.post('/update-doctor' , {
      id: element.id,
      name: element.name,
      description: element.description,
    }).subscribe((doc) => this.doctorCreated(doc),
            (err) => alert (err.error.message)
            );
  } else{
    alert ("Patient has no access to update description")
  }
  
}

deleteDoctor(docId){
 

this.http.post('/delete/doctor' , {
  id: docId,
 
}).subscribe((doc) => { this.doctorCreated(doc) 
  this.responseSuccess(doc);
} ,
        (err) => alert (err.error.message)
        );

}

  doctorCreated(doc) {
      alert('Doctor details are updated');
  }
}
