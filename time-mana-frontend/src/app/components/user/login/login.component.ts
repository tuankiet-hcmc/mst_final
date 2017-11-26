import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import User from '../../../models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService) {}
  public user: User = new User();
  ngOnInit() {}
  login() {
    this.userService.login(this.user).subscribe(
      res => {
        this.userService.storeUserData(res.token, res.user.email);
        console.log(res);
      },
      err => {}
    );
  }
}
