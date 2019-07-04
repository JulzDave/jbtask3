import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todos } from '../models/todos.model'

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

  getTodos(): Observable<any> {
    return this.http.get('/api/todo');
  }

  getSubjects(): Observable<any> {
    return this.http.get('/api/subject');
  }

  addTodo(ev: Todos): Observable<any> {
    return this.http.post('api/todo',
      {
        Description: ev.Description,
        subject: ev.subject
      },
      httpOptions);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`api/todo/${id}`);
  }
}
