import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { Repository } from "typeorm";

import { AppModule } from "../../src/modules/app.module";
import { Task } from "../../src/modules/tasks/entities/Task";

describe("Tasks", () => {
  let app: INestApplication;
  let repository: Repository<Task>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    repository = moduleRef.get("TaskRepository");

    await repository.query("TRUNCATE TABLE tasks");

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe(`/GET tasks`, () => {
    it("should return an empty tasks array", () => {
      return request(app.getHttpServer())
        .get("/tasks?page=1&pageSize=5")
        .expect(200)
        .expect({
          availablePages: 0,
          tasks: [],
        });
    });

    it("should display bad request error due to missing pagination parameters", () => {
      return request(app.getHttpServer()).get("/tasks").expect(400);
    });
  });

  describe("/POST tasks", () => {
    it("should create a new task", () => {
      return request(app.getHttpServer())
        .post("/tasks")
        .send({
          title: "Test task",
        })
        .expect(201)
        .expect((response) => {
          const task = response.body as Task;
          expect(task.id).toBeDefined();
          expect(task.title).toEqual("Test task");
          expect(task.description).toEqual(null);
          expect(task.isDone).toEqual(false);
        });
    });

    it("should display bad request error due to min length not met", () => {
      return request(app.getHttpServer())
        .post("/tasks")
        .send({
          title: "hi",
        })
        .expect(400);
    });

    it("should display bad request error due to max length exceeded", () => {
      return request(app.getHttpServer())
        .post("/tasks")
        .send({
          title: Array(100).fill("a").join(""),
        })
        .expect(400);
    });

    it("should display bad request error due to missing title", () => {
      return request(app.getHttpServer())
        .post("/tasks")
        .send({
          description: "Test task description",
        })
        .expect(400);
    });
  });

  describe(`/GET tasks/:id`, () => {
    it("should return a task", () => {
      return request(app.getHttpServer())
        .get("/tasks/1")
        .expect(200)
        .expect((response) => {
          const task = response.body as Task;
          expect(task.id).toEqual(1);
          expect(task.title).toEqual("Test task");
          expect(task.description).toEqual(null);
          expect(task.isDone).toEqual(false);
        });
    });

    it("should display not found error due to invalid id or non-existent task", () => {
      return request(app.getHttpServer()).get("/tasks/999").expect(404);
    });
  });

  describe("/PATCH tasks/:id", () => {
    it("should update a task", () => {
      return request(app.getHttpServer())
        .patch("/tasks/1")
        .send({
          title: "Test task updated",
          description: "Description updated",
          isDone: true,
        })
        .expect(200)
        .expect((response) => {
          const task = response.body as Task;
          expect(task.id).toEqual(1);
          expect(task.title).toEqual("Test task updated");
          expect(task.description).toEqual("Description updated");
          expect(task.isDone).toEqual(true);
        });
    });

    it("should display not found error due to invalid id or non-existent task", () => {
      return request(app.getHttpServer())
        .patch("/tasks/999")
        .send({
          isDone: true,
        })
        .expect(404);
    });
  });

  describe("/DELETE tasks/:id", () => {
    it("should delete a task", () => {
      return request(app.getHttpServer()).delete("/tasks/1").expect(204);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
