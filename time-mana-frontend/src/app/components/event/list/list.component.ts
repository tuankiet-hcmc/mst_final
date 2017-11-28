import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventService } from '../../../services/event.service';
import Event from '../../../models/event.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  constructor(
    private eventService: EventService, private modalService: NgbModal
  ) { }

  public newEvent;

  eventList: Event[];

  ngOnInit() {
    this.eventService.getEvents().subscribe(event => {
      console.log(event);
      this.eventList = event;
    });
  }

  editEvent(event) {
    this.eventService.editEvent(event._id, event ).subscribe(
      res => {
        this.eventService.getEvents().subscribe(events => {
          this.eventList = events;

        }); console.log(res);
      },
      err => { }
    );
  }

  deleteEvent(event) {
    this.eventService.deleteEvent(event._id).subscribe(
      res => {
        this.eventList.splice(this.eventList.indexOf(event), 1);
      },
      err => { }
    );
  }

  search(event) {
    if (event) {
      this.eventService.getEvent(event).subscribe(products => {
        this.eventList = event;
      });
    } else {
      this.eventService.getEvents().subscribe(products => {
        this.eventList = event;
      });
    }
  }

  open(content, event) {
    this.modalService.open(content);

  }
  close() {
    this.eventService.getEvents().subscribe(event => {
      console.log(event);
      this.eventList = event;
    });
    
  }

}
