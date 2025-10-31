import { Card, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Task } from "../../types/types";
import EditTaskModal from "../tasks/EditTAskModal";
import { memo, useCallback } from "react";

interface TaskCardProps {
  task: Task;
  editTaskMutation: UseMutationResult<Task, Error, Task, unknown>;
  handleDelete: (id: number) => void;
}


function TaskCardComponent({ task, editTaskMutation, handleDelete }: TaskCardProps) {
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData("dragedTask", JSON.stringify(task));
    },
    [task]
  );
  const onDeleteClick = useCallback(() => handleDelete(task.id), [handleDelete, task.id]);

  return (
    <div className="cursor-grabbing">
      <Card
        draggable
        onDragStart={handleDragStart}
        className="mb-3 shadow-sm border-0"
      >
        <Card.Body>
          <Card.Title as="h6" className="fw-bold mb-2">
            {task.title}
          </Card.Title>

          {task.description && (
            <Card.Text className="small text-muted mb-3">
              {task.description}
            </Card.Text>
          )}

          <div className="d-flex justify-content-end gap-2">
            <EditTaskModal task={task} editTaskMutation={editTaskMutation} />
            <Button
              variant="outline-danger"
              size="sm"
              onClick={onDeleteClick}
              aria-label="Delete task"
            >
              <Trash />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export const TaskCard = memo(TaskCardComponent);
export default TaskCard;
