import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatCardModule, MatDialogModule, MatRadioModule, MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CityComponent } from './city/city.component';
import { JobComponent } from './job/job.component';
import { ComplaintComponent, DialogContentExampleDialog } from './complaint/complaint.component';
import { CitizenComponent } from './citizen/citizen.component';
import { BedComponent } from './bed/bed.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorComponent } from './doctor/doctor.component';
import { BillingComponent } from './billing/billing.component';
import { ChatComponent } from './chat/chat.component';
import { AccountantComponent } from './accountant/accountant.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CityComponent,
    JobComponent,
    ComplaintComponent,
    CitizenComponent,
    DialogContentExampleDialog,
    BedComponent,
    PatientComponent,
    DoctorComponent,
    BillingComponent,
    ChatComponent,
    AccountantComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [],
  entryComponents: [
    DialogContentExampleDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
