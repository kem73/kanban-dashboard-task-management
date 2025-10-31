import { useEffect, useMemo, useState, useCallback } from "react";
import { Col } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import Pagination from "../common/Pagination";
import TaskCard from "../tasks/Task";
import type { Task, TaskColumnProps } from "../../types/types";
import { TASKS_PER_PAGE } from "../../utils/constans";
import { API_URL } from "../../config/apiConfig";


function TaskColumn({ col, tasks, columns, idx }: TaskColumnProps) {
  const queryClient = useQueryClient();

    // STATE
  const [columnPages, setColumnPages] = useState<Record<string, number>>({
    backlog: 1,
    "in-progress": 1,
    review: 1,
    done: 1,
  });

  //  MUTATIONS
  const editTaskMutation = useMutation({
    mutationFn: (task: Task) =>
      axios.put<Task>(`${API_URL}/${task.id}`, task).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => axios.delete(`${API_URL}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  //  PAGINATION LOGIC
  const handlePageChange = useCallback((newPage: number, columnKey: string) => {
    setColumnPages((prev) => ({ ...prev, [columnKey]: newPage }));
  }, []);

  const colTasks = useMemo(
    () => tasks.filter((task) => task.column === col.key),
    [tasks, col.key]
  );

  const page = columnPages[col.key] || 1;
  const totalPages = Math.max(1, Math.ceil(colTasks.length / TASKS_PER_PAGE));

  const pagedTasks = useMemo(
    () =>
      colTasks.slice((page - 1) * TASKS_PER_PAGE, page * TASKS_PER_PAGE) || [],
    [colTasks, page]
  );

// HANDLERS
  const handleDelete = useCallback(
    (id: number) => deleteTaskMutation.mutate(id),
    [deleteTaskMutation]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const taskData = e.dataTransfer.getData("dragedTask");
      if (!taskData) return;

      const task: Task = JSON.parse(taskData);
      if (task?.column !== col.key) {
        editTaskMutation.mutate({ ...task, column: col.key });
      }
    },
    [col.key, editTaskMutation]
  );

    //  EFFECTS
  useEffect(() => {
    if (page > totalPages) {
      setColumnPages((prev) => ({
        ...prev,
        [col.key]: Math.max(1, prev[col.key] - 1),
      }));
    }
  }, [tasks, page, totalPages, col.key]);

  //  RENDER
  return (
    <Col
      key={col.key}
      md={3}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`${idx !== columns.length - 1 ? "responsive-border" : ""} py-3`}
    >
      <h5 className="fw-bold mb-3">{col.title}</h5>

      {pagedTasks.length > 0 ? (
        pagedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            editTaskMutation={editTaskMutation}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-muted small">No tasks available</p>
      )}

      <Pagination
        totalPages={totalPages}
        page={page}
        handlePageChange={handlePageChange}
        col={col}
      />
    </Col>
  );
}

export default TaskColumn;
