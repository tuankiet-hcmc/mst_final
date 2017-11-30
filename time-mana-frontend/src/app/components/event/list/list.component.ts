import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges
} from '@angular/core';
import { EventService } from '../../../services/event.service';
import Event from '../../../models/event.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Console } from '@angular/core/src/console';
import { DialogEventComponent } from '../../dialog/dialog-event/dialog-event.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {
  text;
  constructor(
    private eventService: EventService,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) {}

  public newEvent;

  eventList: Event[];
  modalData: {
    action: string;
    event: Event;
  };
  ngOnInit() {
    this.eventService.getEvents().subscribe(event => {
      console.log(event);
      this.eventList = event;
    });
  }

  editEvent(event) {
    this.eventService.editEvent(event._id, event).subscribe(
      res => {
        this.eventService.getEvents().subscribe(events => {
          this.eventList = events;
        });
        console.log(res);
      },
      err => {}
    );
  }

  deleteEvent(event) {
    this.eventService.deleteEvent(event._id).subscribe(
      res => {
        this.eventList.splice(this.eventList.indexOf(event), 1);
      },
      err => {}
    );
  }

  search(event) {
    if (event) {
      this.eventService.getEventsbyName(event).subscribe(events => {
        console.log(this.text);
        this.eventList = events;
      });
    } else {
      this.eventService.getEvents().subscribe(events => {
        this.eventList = events;
      });
    }
  }
  handleEvent(action: string, event: Event): void {
    this.modalData = { event, action };
    this.openDialog(this.modalData);
  }
  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogEventComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  close() {
    this.eventService.getEvents().subscribe(event => {
      console.log(event);
      this.eventList = event;
    });
  }
}
