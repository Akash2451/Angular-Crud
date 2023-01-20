import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from 'src/app/event.service';
import { eventmodel } from './addevent.model';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  providers: [MessageService],
})
export class AddEventComponent implements OnInit {
  // addform!:FormGroup;
  
  emp: any;
  eventModelObj: eventmodel = new eventmodel();
  getallEvents: any;
  defaultValue: any;
  addform = this.formBuilder.group({
    title: [''],
    start: [''],
    end: [''],
  });
  constructor(
    private even: EventService,
    private ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // this.getallEvents();
    this.addform.controls.title.patchValue(this.defaultValue);
  }

  addEvent() {
    console.log(this.addform);
    this.eventModelObj.title = this.addform.value.title;
    this.eventModelObj.start = this.addform.value.start;
    this.eventModelObj.end = this.addform.value.end;

    this.even.addEvent(this.eventModelObj).subscribe(
      (res) => {
        this.addform.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Event Added Successfully',
        });
        console.log(res);
        // this.ref(true)
        // this.getallEvents();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong!!',
        });
        console.log(err);
      }
    );
  }

  
}
