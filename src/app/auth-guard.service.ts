import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService, 
    public router: Router) { }

    canActivate(): boolean {
      if (!this.userService.userType) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
}
