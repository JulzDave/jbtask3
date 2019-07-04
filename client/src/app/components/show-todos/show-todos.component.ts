import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-show-todos',
  templateUrl: './show-todos.component.html',
  styleUrls: ['./show-todos.component.css']
})
export class ShowTodosComponent implements OnInit {


  constructor(private todosService: TodosService) { }

  todos: any = [];
  subjects: any


deleteTodo(ev) {
  const s = this.todos[0].todos.findIndex(todo => todo._id === ev)
  const itemToDelete: string = ev.target.previousElementSibling.id;
  this.todosService.deleteTodo(itemToDelete).subscribe(() => {
    for (let i:number = 0; i < this.todos.length; i++) {
      const index = this.todos[i].todos.findIndex(item => item._id === ev.target.previousElementSibling.id)
      if (index !== -1){
        this.todos[i].todos.splice(index,1);
      }
    }
  })
}

  ngOnInit() {
    this.todosService.getSubjects().subscribe(subjectData => {
      if (subjectData) {
        this.subjects = subjectData
        this.todosService.getTodos().subscribe(todoData => {
          for (let i: number = 0; i < this.subjects.length; i++) {
            
            this.todos.push({ name: this.subjects[i].name, todos: todoData.filter((todo) => todo.subject === this.subjects[i]._id)})
          }
        })
      }
    })
  }

}
