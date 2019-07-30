import { Component, OnInit, ElementRef } from '@angular/core';

import { TodosService } from '../../services/todos.service';

import { ISubject } from '../../models/subjects.model'
import { ITodo } from '../../models/todo.model'
import { ITodos } from '../../models/todos.model'

@Component({
  selector: 'app-show-todos',
  templateUrl: './show-todos.component.html',
  styleUrls: ['./show-todos.component.css']
})
export class ShowTodosComponent implements OnInit {


  constructor(private todosService: TodosService, private elem: ElementRef) { }

  todos: ITodos[] = [];
  subjects: ISubject[];

  changeColor() {
    let elements = this.elem.nativeElement.querySelectorAll('.todoLi');
    let colorBtn = this.elem.nativeElement.querySelector('.colorBtn');

    if (elements[0].style.background === "dodgerblue") {
      elements.forEach(el => {
        el.style.background = "white",
          el.style.color = "black"
      });
      colorBtn.style.background = "dodgerblue";
      colorBtn.style.color = "white";
    }
    else {
      elements.forEach(el => {
        el.style.background = "dodgerblue",
          el.style.color = "white"
      });
      colorBtn.style.background = "white";
      colorBtn.style.color = "black";
    }
  }

  deleteTodo(todoId) {
    const itemToDelete: string = todoId;
    this.todosService.deleteTodo(itemToDelete).subscribe(() => {
      this.todos.forEach(todo => {
        const index = todo.todos.findIndex(item => item._id === todoId);
        if (index !== -1) {
          todo.todos.splice(index, 1);
        }
      })
    })
  }

  mark(todoLi) {
    if (todoLi.style.textDecoration === 'line-through') {
      return todoLi.style.textDecoration = 'none';
    }
    todoLi.style.textDecoration = 'line-through'
  }

  ngOnInit() {
    this.todosService.getSubjects().subscribe((subjectData: ISubject[]) => {
      if (subjectData) {
        this.subjects = subjectData
        this.todosService.getTodos().subscribe((todoData: ITodo[]) => {
          this.subjects.forEach(subject => {
            this.todos.push({
              name: subject.name,
              role: subject.role,
              todos: todoData.filter(todo => { return todo.subject === subject._id; } )
            })
          })
        });
      }
    });
  }
}
