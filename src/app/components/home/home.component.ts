import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/modules/task';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
taskList: Task [] = [];

constructor(private todoservice: TodoService, private router:Router)
{}
  ngOnInit(): void {
    this.reloadTask();
  }
  reloadTask()
  {
    this.todoservice.getAllTasks().subscribe(tasks => {
      this.taskList = tasks.map(task => new Task(task));
    });
  }
}
