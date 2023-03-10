import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TasksController } from "./controllers/tasks.controller";
import { Task } from "./entities/Task";
import { TasksService } from "./services/tasks.service";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
