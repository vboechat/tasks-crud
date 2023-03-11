import { Task } from "../entities/Task";

export type FindAllTasksResponse = {
  availablePages: number;
  tasks: Task[];
};
