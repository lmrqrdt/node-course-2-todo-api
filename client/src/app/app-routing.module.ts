import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateUserComponent } from './components/create-user/create-user.component';
import { LoginComponent } from './components/login/login.component';
import { PostTodoComponent } from './components/post-todo/post-todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { MarkTodoComponent } from './components/mark-todo/mark-todo.component';
import { DeleteTodoComponent } from './components/delete-todo/delete-todo.component';

const appRoutes: Routes = [
  { path: 'create-user', component: CreateUserComponent },
  { path: 'login', component: LoginComponent},
  { path: 'post-todo', component: PostTodoComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'mark', component: MarkTodoComponent },
  { path: 'delete-todo', component: DeleteTodoComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
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
