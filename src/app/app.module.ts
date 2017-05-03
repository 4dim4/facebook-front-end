import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HeaderComponent }  from './header.component';
import{RegisterComponent} from './register-form.component';
import {LoginComponent} from './login.component';
import {HttpService} from './services/http.service';
import { HttpModule } from '@angular/http';
import {RouterModule , Routes} from '@angular/router';

const appRoutes:Routes = [
  { 
    path:'register',
    component:RegisterComponent

  },
  { path : '',
  redirectTo:'/register',
  pathMatch:'full'
}
];
@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule,RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent , HeaderComponent,LoginComponent,RegisterComponent],
  bootstrap:    [ AppComponent ],
  providers:[HttpService]
})
export class AppModule { }
