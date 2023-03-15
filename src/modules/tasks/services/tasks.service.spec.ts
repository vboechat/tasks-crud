import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Task } from "../entities/Task";
import { TasksService } from "./tasks.service";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const mockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  save: jest.fn(),
  count: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const mockTask: Task = {
  id: 1,
  title: "Task 1",
  description: "Task 1 description",
  isDone: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("TasksService", () => {
  let tasksService: TasksService;
  let tasksRepository: Repository<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it("should be defined", () => {
    expect(tasksService).toBeDefined();
    expect(tasksRepository).toBeDefined();
  });

  describe("findAllTasks", () => {
    it("should return an array of tasks", async () => {
      const result = [];

      tasksRepository.count = jest.fn().mockResolvedValue(1);
      tasksRepository.find = jest.fn().mockResolvedValue(result);

      const tasks = await tasksService.findAllTasks({ page: 1, pageSize: 10 });
      expect(tasksRepository.count).toHaveBeenCalled();
      expect(tasksRepository.find).toHaveBeenCalled();
      expect(tasks).toEqual({
        availablePages: 0.1,
        tasks: result,
      });
    });
  });

  describe("findTaskById", () => {
    it("should return a task", async () => {
      tasksRepository.findOne = jest.fn().mockResolvedValue(mockTask);

      const task = await tasksService.findTaskById(1);
      expect(tasksRepository.findOne).toHaveBeenCalled();
      expect(task).toEqual(mockTask);
      expect(task.id).toEqual(1);
    });

    it("should return null if task not found", async () => {
      tasksRepository.findOne = jest.fn().mockResolvedValue(null);

      const task = await tasksService.findTaskById(1);
      expect(tasksRepository.findOne).toHaveBeenCalled();
      expect(task).toBeNull();
    });
  });

  describe("createTask", () => {
    it("should create a task", async () => {
      tasksRepository.save = jest.fn().mockResolvedValue(mockTask);

      const createdTask = await tasksService.createTask({
        title: "Task 1",
        description: "Task 1 description",
      });
      expect(tasksRepository.save).toHaveBeenCalled();
      expect(createdTask).toEqual(mockTask);
    });
  });

  describe("updateTask", () => {
    it("should update a task", async () => {
      const updatedTask: Task = {
        ...mockTask,
        isDone: true,
      };

      tasksRepository.findOne = jest.fn().mockResolvedValue(updatedTask);
      tasksRepository.update = jest.fn().mockResolvedValue(updatedTask);

      const task = await tasksService.updateTask(1, {
        isDone: true,
      });
      expect(tasksRepository.findOne).toHaveBeenCalled();
      expect(tasksRepository.update).toHaveBeenCalled();
      expect(task).toEqual(updatedTask);
      expect(task.isDone).toEqual(true);
    });
  });

  describe("deleteTask", () => {
    it("should delete a task", async () => {
      tasksRepository.delete = jest.fn().mockResolvedValue(null);

      await tasksService.deleteTask(1);
      expect(tasksRepository.delete).toHaveBeenCalled();
    });
  });
});
