import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  floorNo = '';
  slot = '';
  price = '';
  vType = '';
  error = '';

  constructor(private http: HttpClient  ) { }

  ngOnInit() {
  }

  add() {
    let addSlotUrl = this.vType.toLowerCase() === 'two'  ?  '/two-wheeler/slot' : '/four-wheeler/slot' ;
    this.http.post( addSlotUrl , {
      floor: this.floorNo,
      slot: this.slot,
      price: this.price
    }).subscribe( () => this.reset() , 
          (err) => alert( err.error.message) );
  }

  reset() {
    this.floorNo = '';
    this.slot = '';
    this.price = '';
    this.vType = '';
    this.error = '';
  }

}
