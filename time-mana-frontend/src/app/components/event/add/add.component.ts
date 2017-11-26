import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventService } from '../../../services/event.service';
import Event from '../../../models/event.model';

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
  constructor(private eventService: EventService) {}
  public newEvent: Event = new Event();
  eventsList: Event[];

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(event => {
      this.eventsList = event;
      console.log(event);
    });
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
