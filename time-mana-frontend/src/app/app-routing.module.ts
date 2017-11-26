import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AddComponent } from './components/event/add/add.component';
import { EditComponent } from './components/event/edit/edit.component';
import { ListComponent } from './components/event/list/list.component';
import { UnloginedComponent } from './components/navbar/unlogined/unlogined.component';
import { LoginedComponent } from './components/navbar/logined/logined.component';
import { FooterComponent } from './components/footer/footer.component';

const appRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'addevent', component: AddComponent},
  { path: 'listevent', component: ListComponent}
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
