mport { TaskSchema } from "../schemas/task.schema.ts";

export const TaskController = {
  getAll: (): TaskSchema[] => {
    return [];
  },

  create: (task: TaskSchema): TaskSchema => {
    return task;
  },
};