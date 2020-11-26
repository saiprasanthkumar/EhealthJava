import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  patientId = '';
  amount = '';
  description = '';

  displayedColumns = ['patientId', 'description', 'amount' , 'book'];
  dataSource = [];

  constructor(public userService: UserService, private http: HttpClient) { 
    console.log('Enter the user type ', this.userService);
  }

  ngOnInit() {
    this.http.get('/view/billing').subscribe((data) => this.responseSuccess(data),
    (err) => alert (err.error.message)
    );
  }

  responseSuccess(data) {
    this.dataSource =  data;
  }
  generateBilling() {
    this.http.post('/add/billing' , {
      patientId: this.patientId,
      description: this.description,
      amount: this.amount,
    }).subscribe((data) => this.responseSuccess(data),
            (err) => alert (err.error.message)
            );
  }

  updateBilling(element) {
    this.http.post('/add/billing' , {
      patientId: element.id,
      description: element.name,
      amount: element.description,
      isPayed: true
    }).subscribe((data) => this.responseSuccess(data),
            (err) => alert (err.error.message)
            );
  }
}
