import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  doctorId = '';
  problem ='';
  timing = '';
  dataSource = [];
  medicationpatientId = '';
  medication = '';
  dataSourceMedication = [];
  displayedColumns: string[] = ['patientId' ,'patientName', 'amount', 'book'  ];
  displayedColumnsMedication: string[] = ['patientId', 'description'];
  
  constructor(public userService: UserService ,private http: HttpClient) { 
  }

  ngOnInit() {
    this.http.get('/view/patient').subscribe((data) => this.responseSuccess(data),
            (err) => alert (err.error.message)
            );
  this.http.get('/view/medication').subscribe((data) => this.responseMedicationSuccess(data),
            (err) => alert (err.error.message)
            );
  }

  responseSuccess(data) {
    this.dataSource  = data;
  }

  responseMedicationSuccess(data) {
    this.dataSourceMedication = data;
  }

  updatePatient(element) {
    this.http.post('/updatepatient' , {
      patientId: element.patientId,
      patientName: element.patientName,
      amount: element.amount,
      medication: null
    }).subscribe((patient) => this.patientCreated(patient),
            (err) => alert (err.error.message)
            );
  }

  patientCreated(patient) {
    
  }
  medicationCreated(medication) {
    this.displayedColumnsMedication = medication;
  }
  createMedication() {
    this.http.post('/add/medication' , {
      patientId: this.medicationpatientId,
      description: this.medication
    }).subscribe((medication) => this.responseMedicationSuccess(medication),
            (err) => alert (err.error.message)
            );
  }

  createAppointment() {
    this.http.post('/add/appointment' , {
      patientId: this.userService.userId,
      doctorId: this.doctorId,
      patientDesc: this.problem ,
      timing: this.timing
    }).subscribe(() =>{},
            (err) => alert (err.error.message)
            );
  }

}
