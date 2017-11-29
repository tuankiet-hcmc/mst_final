import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventService } from '../../../services/event.service';
import Event from '../../../models/event.model';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {
  message = '';
  boolerr = false;
  boolsuc = false;
  refresh: Subject<any> = new Subject();
  constructor(private eventService: EventService) {}
  public newEvent: Event = new Event();


  ngOnInit(): void {
  }

  create() {
    this.eventService.createEvent(this.newEvent).subscribe(
      res => {
        this.message = res.message;
        this.boolsuc = true;
        this.boolerr = false;
        this.newEvent = new Event();
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
