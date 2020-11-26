import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  uname = '';
  password = '';
  usertype = '';
  confirmpassword = '';
  error = '' ;

  constructor(private http:HttpClient , private route: Router,
    private userService: UserService) { }

  ngOnInit() {
  }

  signUp() {
     if (this.confirmpassword === this.password) {
        this.http.post('/signup' , {
          user: this.uname,
          password: this.password,
          type : this.usertype
        }).subscribe((data) => this.responseSuccess(data),
                (err) => alert (err.error.message)
                );
    } else {
        alert('ConfirmPassword is different from Password');
    }
  }

  responseSuccess(data) {
    this.userService.userId = data.userId;
    this.userService.userType = this.usertype;
    this.userService.userName = data.user;
    this.route.navigate(['home']);
    this.reset();
  }
  reset() {
    this.uname = '';
    this.password = '';
    this.usertype = '';
    this.confirmpassword = '';
  }

}
