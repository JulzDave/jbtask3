import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ShowTodosComponent } from './components/show-todos/show-todos.component';

const routes: Routes = [
  {path:"", component:ShowTodosComponent, pathMatch:'full'},
  {path:"add", component:AddTodoComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
