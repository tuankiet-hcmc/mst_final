import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventService } from '../../../services/event.service';
import Event from '../../../models/event.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  constructor(
    private eventService: EventService
  ) {}

  public newEvent: Event = new Event();

  eventList: Event[];

  ngOnInit() {
    this.eventService.getEvents().subscribe(event => {
      console.log(event);
      this.eventList = event;
    });
  }

  // editEvent(event) {
  //   this.eventService.editEvent(event._id).subscribe(
  //     res => {
  //       this.eventList.replace(this.eventList.indexOf(event), 1);
  //     },
  //     err => {}
  //   );
  //}

  deleteEvent(event) {
    this.eventService.deleteEvent(event._id).subscribe(
      res => {
        this.eventList.splice(this.eventList.indexOf(event), 1);
      },
      err => {}
    );
  }
}
