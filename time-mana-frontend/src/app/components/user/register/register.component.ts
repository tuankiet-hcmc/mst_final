import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import User from '../../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message = '';
  boolerr = false;
  boolsuc = false;
  constructor(private userService: UserService) {}
  public newUser: User = new User();
  ngOnInit() {}
  register() {
    this.userService.register(this.newUser).subscribe(
      res => {
        this.message = res.message;
        this.boolsuc = true;
        this.boolerr = false;
        this.newUser = new User();
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
