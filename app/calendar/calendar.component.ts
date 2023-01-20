import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DialogService } from 'primeng/dynamicdialog';
import { EventService } from '../event.service';
import { AddEventComponent } from './add-event/add-event.component';
import { MessageService } from 'primeng/api';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [MessageService],
})
export class CalendarComponent implements OnInit {
  events: any;
  calendarOptions: CalendarOptions = {
    longPressDelay:0,
    headerToolbar: {
      left: 'prev next today',
      center: 'title',
      right: 'dayGridMonth timeGridWeek timeGridDay',
    },
    select: this.show.bind(this), //add popup
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    droppable: true,
    displayEventEnd: true,
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    eventColor: '#28a745',
    eventClick:this.handleDateClick.bind(this), //delete event
    
  };

  show(event: any) {
    const ref = this.dialogService.open(AddEventComponent, {
      header: 'Add Event',
      width: '25%',
      height: '52%',
    });
  }

  constructor(
    private even: EventService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getallEvents();
  }

    handleDateClick(arg:any){
      let filterEvent = this.events.filter((e:any) => e.id == arg.event._def.publicId)[0];
      const ref = this.dialogService.open(DeleteComponent,  {
        header: 'Delete Event',
        width: '25%',
        height: '52%',
        data:filterEvent
      });
  }
 
  getallEvents() {
    this.even.getallEvents().subscribe(
      (res) => {
        this.events = res;
        this.calendarOptions.events = this.events;
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong !',
        });
        console.log(err);
      }
    );
  }
}
