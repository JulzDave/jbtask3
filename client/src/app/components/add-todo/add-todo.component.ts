import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  constructor(private todosService: TodosService, private router: Router) { }

  allSubjects: any;
  description: string;
  chosenSubject:string;



  addTodoForm: FormGroup = new FormGroup({

    description: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    chosenSubject: new FormControl(null, [Validators.required]),
    
  }
  );

  addTodo(){
    if(this.addTodoForm.valid){
    this.todosService.addTodo({
         Description:this.addTodoForm.controls.description.value,
         subject:this.addTodoForm.controls.chosenSubject.value
        }).subscribe(data => {
          this.router.navigate(['/']);
    });
  }
  }

  ngOnInit() {
    this.todosService.getSubjects().subscribe(subjectData => {
      this.allSubjects = subjectData;
      this.addTodoForm.controls.chosenSubject.setValue(subjectData[0]._id)
    });
  }

}
