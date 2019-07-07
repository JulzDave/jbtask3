import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CanDeactivate } from '@angular/router'
import { ITodo } from '../models/todo.model'
import { ISubject } from '../models/subjects.model'
import { AddTodoComponent } from '../components/add-todo/add-todo.component';

const httpOptions: any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error("Client Side Error: ", errorResponse.error.message)
    }
    else console.error("Server Side Error: ", errorResponse)

    return throwError("There is a problem with the service. We are notified & working on it. Please try again later.")
  }

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>('/api/todo')
      .pipe(
        catchError(this.handleError)
      );
  }

  getSubjects(): Observable<ISubject[]> {
    return this.http.get<ISubject[]>('/api/subject')
      .pipe(
        catchError(this.handleError)
      );
  }

  addTodo(ev: ITodo): Observable<Object> {
    return this.http.post('api/todo',
      {
        Description: ev.Description,
        subject: ev.subject
      },
      httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTodo(id: string): Observable<Object> {
    return this.http.delete(`api/todo/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  canDeactivate(component: AddTodoComponent): boolean{
    debugger;
    if( component.addTodoForm.dirty && !component.redirecting && component.addTodoForm.controls.description.value.length !== 0 ){
      return confirm("Are you sure you want to navigate away from this page?")
    }
    return true;
  }

}
