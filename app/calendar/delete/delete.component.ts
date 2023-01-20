import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventService } from 'src/app/event.service';
import { eventmodel } from '../add-event/addevent.model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  providers: [MessageService],

})
export class DeleteComponent implements OnInit {
  eventModelObj: eventmodel = new eventmodel();
   calendar:any;
   deleteform = this.formBuilder.group({
    title: [''],
    start: [''],
    end: [''],
  });
  constructor(
    private config:DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private even: EventService, 
    private messageService:MessageService 
    ) { }

  ngOnInit(): void {
    this.calendar=this.config.data; //assign the value of calendar to config
    console.log("this.config.data",this.calendar);
    
    
  }
  delete() {
    console.log(this.deleteform);
    this.even.deleteEvent(this.calendar).subscribe(
      (res) => {
        console.log(res);
        // this.getallEvents();
      },
      (err) => {
        
        console.log(err);
      }
    );
  }

  
    // update() {
    //   console.log(this.deleteform);
    //   this.calendar.title = this.deleteform.value.title;
    //   this.calendar.start = this.deleteform.value.start;
    //   this.calendar.end = this.deleteform.value.end;
  
    //   this.even.updateEvent(this.calendar, this.eventModelObj).subscribe(
    //     (res) => {
    //       this.deleteform.reset();
    //       this.messageService.add({
    //         severity: 'success',
    //         summary: 'Success',
    //         detail: 'Event Updated Successfully',
    //       });
    //       console.log(res);
    //       // this.ref(true)
    //       // this.getallEvents();
    //     },
    //     (err) => {
    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: 'Something went wrong!!',
    //       });
    //       console.log(err);
    //     }
    //   );
    // }
  
  }

