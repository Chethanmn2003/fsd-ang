import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Task } from 'src/app/modules/task';
import { User } from 'src/app/modules/user';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit{

  isloggedIn: boolean = false;
  currentuser : any = {};
  tasks: any[] = [];
  newTask: Task  = new Task({});
  taskList: any[] = [];
  selectedTask: Task = new Task({});
  userId : number = 1;
  
 @Output()
  taskCreated = new EventEmitter

  constructor(private route: ActivatedRoute, private toDoservice : TodoService, private userService : UserService)
  {  }
  ngOnInit(): void {
   
    this.userService.isLoggedIn.subscribe((loggedIn) => {
      this.isloggedIn = loggedIn;
      if (loggedIn) {
        const jwtstring = localStorage.getItem('myChallengeToken');
        // console.log('Token:', jwtstring);
  
        if (jwtstring !== null) {
          try {
            const decodedToken: any = jwtDecode(jwtstring);
            // console.log('Decoded Token:', decodedToken);
  
            if (decodedToken && decodedToken.unique_name) {
              // console.log('User Name:', decodedToken.unique_name);
              this.currentuser = { name: decodedToken.unique_name };
            } else {
              console.error('Invalid JWT structure:', decodedToken);
            }
          } catch (error) {
            console.error('Error decoding JWT:', error);
          }
        } else {
          this.currentuser = null;
        }
      }
    });
  
   
     this.toDoservice.getTaskByUserId(this.currentuser.userId).subscribe(() => {
      this.taskList = this.tasks;
     });
   
  }



 
 
  createTask(): void
  { 
    this.toDoservice.createTask(this.newTask).subscribe(()=> {
     this.newTask = new Task({});
      this.taskCreated.emit(true);

      console.log('Fetching tasks after creation...');
   
    });
  }

  // updateTask(): void {
  //   this.selectedTask.completed = true;

  //   this.toDoservice.updateTask(this.selectedTask).subscribe(() => {
   
  //     this.selectedTask = new Task({});
  //   });
  // }

  // deleteTask(taskId: number): void
  // {
  //   this.toDoservice.deleteTask(taskId).subscribe(()=> {
    
  //     this.selectedTask = new Task({});
  //   })
  // }
}



