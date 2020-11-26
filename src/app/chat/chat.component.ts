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

  constructor(public userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.http.post('/view/chat' , {
      patientId: this.userService.userId,
      doctorId: this.userService.userId,
    }).subscribe(() =>{},
            (err) => alert (err.error.message)
            );
  }

  updateChatBoxDoctor() {
    this.http.post('/view/chat' , {
      patientId: this.patientId,
      doctorId: this.userService.userId,
      question: this.question,
      reply: this.reply,
    
    }).subscribe(() =>{},
            (err) => alert (err.error.message)
            );
  }

  updateChatBoxPatient() {
    this.http.post('/view/chat' , {
      patientId: this.userService.userId,
      doctorId: this.doctorId,
      question: this.question,
      reply: this.reply,
    
    }).subscribe(() =>{},
            (err) => alert (err.error.message)
            );
  }
}
