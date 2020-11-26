import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  doctorName = '';
  patientName = '';
  reply = '';
  question = '';
  dataSource = [];
  dataSource1 = [];
  
  displayedColumns: string[] = ['doctorName' ,'patientName', 'question' ];
  displayedColumnsReply: string[] = ['doctorName' ,'patientName', 'reply'  ];
  


  constructor(public userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    let doc = '';
    let pat = '';
   if(this.userService.userType.toLowerCase() === 'doctor'){
     doc = this.userService.userName ? this.userService.userName : ''
     pat = this.patientName
   } else{
     pat = this.userService.userName ? this.userService.userName : ''
     doc= this.doctorName
   }
    this.http.post('/view/chat' , {
      patientName: pat,
      doctorName: doc,
      question:'',
      reply:''
    }).subscribe((data) =>this.responseSuccess(data),
            (err) => alert (err.error.message)
            );
  }

  responseSuccess(data) {
    console.log('gridDAta', data)
    this.dataSource  = data;
    this.dataSource1  = data;
  }

  updateChatBoxDoctor() {
    this.http.post('/add/chat' , {
      patientName: this.patientName,
      doctorName: this.userService.userName,
      question: this.question,
      reply: this.reply,
    
    }).subscribe((res) =>{
      console.log(res);
      // this.dataSource  = res;
      alert ('Reply sent to patient')},
            (err) => alert (err.error.message)
            );
  }

  updateChatBoxPatient() {
    this.http.post('/add/chat' , {
      patientName: this.userService.userName,
      doctorName: this.doctorName,
      question: this.question,
      reply: this.reply,
    
    }).subscribe((res) =>alert ('Question posted to the doctor'),
            (err) => alert (err.error.message)
            );
  }
}
