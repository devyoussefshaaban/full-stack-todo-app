import { Task } from "@/models/Task";
import { FC } from "react";

interface IProps {
  task: Task;
}

const TaskItem: FC<IProps> = ({ task }) => {
  return (
    <div>
      <p>{task.title}</p>
    </div>
  );
};

export default TaskItem;
