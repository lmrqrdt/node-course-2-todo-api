import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule } from 'angular-notifier';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { PostTodoComponent } from './components/post-todo/post-todo.component';
import { MarkTodoComponent } from './components/mark-todo/mark-todo.component';
import { DeleteTodoComponent } from './components/delete-todo/delete-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    LoginComponent,
    CreateUserComponent,
    PostTodoComponent,
    MarkTodoComponent,
    DeleteTodoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    NotifierModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
