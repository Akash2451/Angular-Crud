import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { SignupComponent } from './signup/signup.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChartComponent } from './chart/chart.component';
import {ChartModule} from 'primeng/chart';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { AddEventComponent } from './calendar/add-event/add-event.component';
import { WorkInProgressComponent } from './home/work-in-progress/work-in-progress.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import { SpeedDialModule } from 'primeng/speeddial';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataComponent } from './data/data.component';
import {PaginatorModule} from 'primeng/paginator';
import { EmpDetailsComponent } from './emp-details/emp-details.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    SignupComponent,
    CalendarComponent,
    ChartComponent,
    AddEventComponent,
    WorkInProgressComponent,
    DataComponent,
    EmpDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    TableModule,
    FullCalendarModule,
    ChartModule,
    DynamicDialogModule,
    InputNumberModule,
    CalendarModule,
    InputTextModule,
    SpeedDialModule,
    MessagesModule,
    ConfirmDialogModule,
    PaginatorModule

  ],

  providers: [
    DialogService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
