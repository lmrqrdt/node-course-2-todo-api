import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateUserComponent } from './components/create-user/create-user.component';
import { LoginComponent } from './components/login/login.component';
import { LogoffComponent } from './components/logoff/logoff.component';
import { PostTodoComponent } from './components/post-todo/post-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { MarkComponent } from './components/mark/mark.component';
import { DeleteComponent } from './components/delete/delete.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

const appRoutes: Routes = [
  { path: 'create-user', component: CreateUserComponent },
  { path: 'login', component: LoginComponent},
  { path: 'logoff', component: LogoffComponent },
  { path: 'post-todo', component: PostTodoComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'mark', component: MarkComponent },
  { path: 'delete', component: DeleteComponent},
  { path: 'delete-user', component: DeleteUserComponent }
  // { path: '',   redirectTo: '/todo-list', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
