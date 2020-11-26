import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userName: string;
  public userType: string;
  public userId: String;

  constructor() { }
}
