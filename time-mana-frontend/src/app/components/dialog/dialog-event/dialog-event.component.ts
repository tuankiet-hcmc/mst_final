// import { close } from 'fs';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CalendarComponent } from '../../calendar/calendar.component';
import Event from '../../../models/event.model';
import { EventService } from '../../../services/event.service';
@Component({
  selector: 'app-dialog-event',
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.css']
})
export class DialogEventComponent implements OnInit {
  event: Event;
  constructor(
    private eventService: EventService,
    public dialogRef: MatDialogRef<CalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.event = this.data.event;
    console.log(this.event);
  }
  save() {
    this.eventService.editEvent(this.event._id, this.event).subscribe(
      res => {
        this.dialogRef.close();
      },
      err => {}
    );
  }
  close() {
    this.dialogRef.close();
  }
}
