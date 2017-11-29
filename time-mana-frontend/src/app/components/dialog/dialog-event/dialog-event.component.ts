import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CalendarComponent } from '../../calendar/calendar.component';
import Event from '../../../models/event.model';
@Component({
  selector: 'app-dialog-event',
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.css']
})
export class DialogEventComponent implements OnInit {
  event: Event;
  constructor(
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
}
