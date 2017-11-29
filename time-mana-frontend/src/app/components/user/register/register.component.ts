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
  form;
  message = '';
  boolerr = false;
  boolsuc = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }
  public newUser: User = new User();
  ngOnInit() {}

  createForm() {
    this.form = this.formBuilder.group({
      // Email Input
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
      ])],
      // Username Input
      username: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
      ])],
      // Password Input
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirm')});
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return {'matchingPasswords': true}
      }
    }
  }
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
