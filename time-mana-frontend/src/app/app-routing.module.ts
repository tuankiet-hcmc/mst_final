import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AddComponent } from './components/event/add/add.component';
import { ListComponent } from './components/event/list/list.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'addevent', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'listevent', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
