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

  async findAllTasks(
    paginationDto: PaginationDto
  ): Promise<FindAllTasksResponse> {
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
    return this.taskRepository.save(task);
  }

  async updateTask(id: number, task: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, task);

    return this.taskRepository.findOne({ where: { id } });
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
