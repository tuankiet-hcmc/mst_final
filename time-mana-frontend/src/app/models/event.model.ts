class Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  priority: string;

  constructor() {
    this.name = '';
    this.description = '';
    this.date = '';
    this.location = '';
    this.priority = '';
  }
}

export default Event;
