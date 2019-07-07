import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ShowTodosComponent } from './components/show-todos/show-todos.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TodosService } from './services/todos.service';

const routes: Routes = [
  {path:"", component:ShowTodosComponent},
  {path:"add", canDeactivate:[TodosService], component:AddTodoComponent},
  { path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
