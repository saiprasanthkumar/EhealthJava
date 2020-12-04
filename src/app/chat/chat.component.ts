import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  doctorId = '';
  patientId = '';
  reply = '';
  question = '';
  dataSource = [];
  dataSource1 = [];
  
  displayedColumns: string[] = ['doctorId' ,'patientId', 'question' ];
  displayedColumnsReply: string[] = ['doctorId' ,'patientId', 'reply'  ];
  


  constructor(public userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    let doc: String = '';
    let pat: String = '';
   if(this.userService.userType.toLowerCase() === 'doctor'){
     doc = this.userService.userId ? this.userService.userId : ''
     pat = ''
   } else{
     pat = this.userService.userId ? this.userService.userId : ''
     doc= ''
   }
    this.http.post('/view/chat' , {
      patientId: pat,
      doctorId: doc,
      question:'',
      reply:''
    }).subscribe((data) =>this.responseSuccess(data),
            (err) => alert (err.error.message)
            );
  }

  responseSuccess(data) {
   console.log(data)
   let dat = data;
   let dat2 = data;

    this.dataSource  = dat.filter(d => d.question =='');
    this.dataSource1  =  dat2.filter(d => d.reply =='');
  }

  updateChatBoxDoctor() {
    this.http.post('/add/chat' , {
      patientId: this.patientId,
      doctorId: this.userService.userId ,
      question: '',
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
      patientId:this.userService.userId ,
      doctorId: this.doctorId,
      question: this.question,
      reply: '',
    
    }).subscribe((res) =>alert ('Question posted to the doctor'),
            (err) => alert (err.error.message)
            );
  }
}
