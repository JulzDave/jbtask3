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
      elements.forEach(el => { el.style.background = "white", el.style.color = "black" });
      colorBtn.style.background = "dodgerblue";
      colorBtn.style.color = "white";
    }
    else {
      elements.forEach(el => { el.style.background = "dodgerblue", el.style.color = "white" });
      colorBtn.style.background = "white";
      colorBtn.style.color = "black";
    }
    
  }

  deleteTodo(ev) {
    const itemToDelete: string = ev.target.previousElementSibling.id;
    this.todosService.deleteTodo(itemToDelete).subscribe(() => {
      for (let i: number = 0; i < this.todos.length; i++) {
        const index = this.todos[i].todos.findIndex(item => item._id === ev.target.previousElementSibling.id);
        if (index !== -1) {
          this.todos[i].todos.splice(index, 1);
        }
      }
    })
  }

  ngOnInit() {
    this.todosService.getSubjects().subscribe((subjectData: ISubject[]) => {
      if (subjectData) {
        this.subjects = subjectData
        this.todosService.getTodos().subscribe((todoData: ITodo[]) => {
          for (let i: number = 0; i < this.subjects.length; i++) {
            this.todos.push({
              name: this.subjects[i].name, role: this.subjects[i].role, todos: todoData.filter((todo) => {
                return todo.subject === this.subjects[i]._id;
              })
            })
          }
        })
      }
    })
  }
}
