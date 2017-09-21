import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { HeaderComponent }  from './header.component';
import{RegisterComponent} from './register-form.component';
import {LoginComponent} from './login.component';
import {HomeComponent} from './home.component';
import {PostFormComponent} from './post-form.component';
import {PostListComponent} from './post-list.component';
import {PostComponent} from './post.component';
import {CommentComponent} from './comment.component';
import {ReplyComponent} from './reply.component';
import {HttpService} from './services/http.service';
import { HttpModule } from '@angular/http';
import {RouterModule , Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes:Routes = [
  { 
    path:'register',
    component:RegisterComponent

  },
  { path : '',
  redirectTo:'/register',
  pathMatch:'full'
},
{ path : 'home',
 component:HomeComponent
}
];
@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule,RouterModule.forRoot(appRoutes),BrowserAnimationsModule],
  declarations: [ AppComponent , HeaderComponent,LoginComponent,RegisterComponent,HomeComponent,PostFormComponent,PostListComponent,PostComponent,CommentComponent,ReplyComponent],
  bootstrap:    [ AppComponent ],
  providers:[HttpService]
})
export class AppModule { }
