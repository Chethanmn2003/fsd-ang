import { User } from "./user";

export class Task {

    taskId? : number | undefined;
    taskname? : string;
    completed? : boolean;
    userId? : number;
    user?: User;
    createdOn?: Date;

  constructor(task : any)
  {
    this.taskId = task.taskId !== undefined ? task.taskId : undefined;
    this.taskname = task.taskname;
    this.completed = task.completed;
    this.user = task.user;
    this.userId = task.userId;

  }
}
