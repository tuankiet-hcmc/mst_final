import { Component, OnInit, style } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (this.userService.loggedIn()) {
      this.router.navigate(['/listevent']);
      return true; // Return true: User is allowed to view route
    } else {
      this.router.navigate(['/']); // Return error and route to login page
      return false; // Return false: user not authorized to view page
    }
  }

  signup() {
    this.router.navigate(['/register']);
  }
  signin() {
    this.router.navigate(['/login']);
  }
}
