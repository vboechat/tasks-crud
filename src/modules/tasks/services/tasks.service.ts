import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateTaskDto } from "../dtos/create-task.dto";
import { PaginationDto } from "../dtos/pagination.dto";
import { UpdateTaskDto } from "../dtos/update-task.dto";
import { Task } from "../entities/Task";
import { FindAllTasksResponse } from "../types/find-all-tasks-response";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<FindAllTasksResponse> {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;
    const items = await this.taskRepository.count();
    const availablePages = Number(items) / Number(pageSize);

    return {
      availablePages,
      tasks: await this.taskRepository.find({
        skip,
        take: pageSize,
      }),
    };
  }

  async findTaskById(id: number): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    const taskObject: Task = new Task();

    taskObject.title = task.title;
    taskObject.description = task.description;

    return this.taskRepository.save(taskObject);
  }

  async updateTask(id: number, task: UpdateTaskDto): Promise<Task> {
    const taskObject: Task = await this.findTaskById(id);

    taskObject.title = task.title;
    taskObject.description = task.description;
    taskObject.isDone = task.isDone;

    return this.taskRepository.save(taskObject);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
