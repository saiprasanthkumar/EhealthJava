import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountantComponent } from './accountant/accountant.component';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth-guard.service';
import { BedComponent } from './bed/bed.component';
import { BillingComponent } from './billing/billing.component';
import { ChatComponent } from './chat/chat.component';
import { CitizenComponent } from './citizen/citizen.component';
import { CityComponent } from './city/city.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/home.component';
import { JobComponent } from './job/job.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { SignupComponent } from './signup/signup.component';



const routes: Routes = [  
  { path: '', component: LoginComponent } , 
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent  },
  { path: 'patient', component: PatientComponent  },
  { path: 'doctor', component: DoctorComponent  },
  { path: 'bed', component: BedComponent  },
  { path: 'billing', component: BillingComponent } ,
  { path: 'chat', component: ChatComponent }, 
  { path: 'accountant', component: AccountantComponent }, 
  { path: 'citizen', component: CitizenComponent , canActivate: [AuthGuardService] }];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
