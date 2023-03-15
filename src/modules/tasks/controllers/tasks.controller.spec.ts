import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Task } from "../entities/Task";
import { TasksService } from "../services/tasks.service";
import { TasksController } from "./tasks.controller";

describe("TasksController", () => {
  let tasksController: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
  });

  it("should be defined", () => {
    expect(tasksController).toBeDefined();
  });
});
