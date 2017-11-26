import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import User from '../../../models/user.model';
import { Route } from '@angular/router/src/config';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message = '';
  boolerr = false;
  boolsuc = false;
  constructor(private userService: UserService, private router : Router) {}
  public user: User = new User();
  ngOnInit() {}
  login() {
    this.userService.login(this.user).subscribe(
      res => {
        if(!res.success) {
          this.message = res.message;
          this.boolsuc = false;
          this.boolerr = true;
        } else {
          this.message = res.message;
          this.boolsuc = true;
          this.boolerr = false;
          this.userService.storeUserData(res.token, res.user.email);
          this.router.navigate(["/listevent"]);
        }
      },

      err => {
        console.log(err);
      }
    );
  }
}
