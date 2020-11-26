import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css']
})
export class BedComponent implements OnInit {

  roomNo: Number;
  description: string;
  bedCount: Number;

  dataSource = [];
  displayedColumns: string[] = ['roomNo' ,'totalBeds', 'description', 'isBooked'  ];

  constructor(public userService: UserService ,private http: HttpClient) { }

  ngOnInit() {
   
    this.http.get('/view/room').subscribe((data) => this.responseSuccess(data),
            (err) => alert (err.error.message)
            );
  }

  responseSuccess(data) {
    this.dataSource  = data;
  }

  createRoom() {
    if(!this.roomNo) {
      alert('Please enter the room number');
      return;
    }
    this.http.post('/add/room' , {
      roomNo: this.roomNo,
      totalBeds: this.bedCount,
      description: this.description
    }).subscribe((room) => this.roomCreated(room),
            (err) => alert (err.error.message)
            );
  }

  roomCreated(rooms) {
    this.dataSource = rooms;
    this.roomNo = null;
    this.description = '';
    this.bedCount = null;
  }
}
