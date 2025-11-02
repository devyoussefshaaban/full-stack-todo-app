import TaskItem from "@/components/tasks/TaskItem";
import { Button } from "@/components/ui/button";
import { Task } from "@/models/Task";

export default function Tasks() {
  const tasks: Task[] = [];
  return (
    <div className="grid place-items-center">
      <div>
        <h1>Today's Tasks</h1>
        <div className="flex flex-col content-center">
          {tasks?.length ? (
            tasks.map((task) => <TaskItem key={task._id} task={task} />)
          ) : (
            <div className="text-center">
              <p>There is no tasks for now.</p>
              <Button variant="default" className="cursor-pointer" size="lg">
                Add Task
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
