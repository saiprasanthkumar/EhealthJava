import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uname = '';
  password = '';
  usertype = '';
  error= '';

  constructor(private http: HttpClient , private route: Router,private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    console.log('Log in');
    this.http.post('/login' , {
      user: this.uname,
      password: this.password,
      type : this.usertype
    }).subscribe((data) => this.successResponse(data) , 
                (err) => alert(err.error.message));
  }

  successResponse(data) {
  
    this.userService.userName = this.uname;
    this.userService.userType = this.usertype;
    this.userService.userId = data.userId;
    if(this.usertype === 'accountant') {
      this.route.navigate(['accountant']);
    }else {
      this.route.navigate(['home']);
    }
    this.reset();
  }
  reset() {
    this.uname = '';
    this.password = '';
    this.usertype = '';
    this.error= '';
  }
}

