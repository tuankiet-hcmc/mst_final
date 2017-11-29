import { colors } from '../calendar-utils/color';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
class Event implements CalendarEvent {
  _id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location: string;
  color: EventColor;

  constructor() {
    this.title = '';
    this.description = '';
    this.start = subDays(endOfMonth(new Date()), 3);
    this.end = addDays(endOfMonth(new Date()), 3);
    this.location = '';
    this.color = {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    };
  }
}
export interface EventColor {
  primary: string;
  secondary: string;
}
export default Event;
