import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateTaskDto } from "../dtos/create-task.dto";
import { UpdateTaskDto } from "../dtos/update-task.dto";
import { Task } from "../entities/Task";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findTaskById(id: number): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async updateTask(id: number, task: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, task);

    return await this.taskRepository.findOne({ where: { id } });
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
