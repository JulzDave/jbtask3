import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITodo } from '../models/todo.model'
import { ISubject } from '../models/subjects.model'

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

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>('/api/todo');
  }

  getSubjects(): Observable<ISubject[]> {
    return this.http.get<ISubject[]>('/api/subject');
  }

  addTodo(ev: ITodo): Observable<Object> {
    return this.http.post<ITodo>('api/todo',
      {
        Description: ev.Description,
        subject: ev.subject
      },
      httpOptions);
  }

  deleteTodo(id: string): Observable<Object> {
    return this.http.delete(`api/todo/${id}`);
  }
}
