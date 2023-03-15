import { Task } from "./Task";

describe("Task Entity", () => {
  it("should be defined", () => {
    expect(new Task()).toBeDefined();
  });

  it("should create a task", () => {
    const task = new Task();
    task.title = "Test title";
    task.description = "Test description";
    task.isDone = false;

    expect(task).toBeInstanceOf(Task);
    expect(task.title).toBe("Test title");
    expect(task.description).toBe("Test description");
    expect(task.isDone).toBe(false);
  });
});
