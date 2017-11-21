import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AddComponent } from './components/event/add/add.component';
import { EditComponent } from './components/event/edit/edit.component';
import { ListComponent } from './components/event/list/list.component';
import { UnloginedComponent } from './components/navbar/unlogined/unlogined.component';
import { LoginedComponent } from './components/navbar/logined/logined.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddComponent,
    EditComponent,
    ListComponent,
    UnloginedComponent,
    LoginedComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
