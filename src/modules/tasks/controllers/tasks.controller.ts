import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ParseIdPipe } from "../../../common/pipes/ParseId.pipe";
import { CreateTaskDto } from "../dtos/create-task.dto";
import { PaginationDto } from "../dtos/pagination.dto";
import { UpdateTaskDto } from "../dtos/update-task.dto";
import { TasksService } from "../services/tasks.service";

@Controller("tasks")
@ApiTags("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAllTasks(@Query() pagination: PaginationDto) {
    return this.tasksService.findAllTasks(pagination);
  }

  @Get(":id")
  async findTaskById(@Param("id", ParseIdPipe) id: number) {
    return this.tasksService.findTaskById(id);
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Patch(":id")
  async updateTask(
    @Param("id", ParseIdPipe) id: number,
    @Body() task: UpdateTaskDto
  ) {
    return this.tasksService.updateTask(id, task);
  }

  @Delete(":id")
  @HttpCode(204)
  async deleteTask(@Param("id", ParseIdPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
