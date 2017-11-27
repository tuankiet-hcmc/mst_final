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
  constructor(private userService: UserService, private router: Router) {}
  public newUser: User = new User();
  ngOnInit() {}
  register() {
    this.userService.register(this.newUser).subscribe(
      res => {
        if(!res.success) {
          this.message = res.message;
          this.boolsuc = false;
          this.boolerr = true;
          this.newUser = new User();
        } else {
          this.message = res.message;
          this.boolsuc = true;
          this.boolerr = false;
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 2000);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
