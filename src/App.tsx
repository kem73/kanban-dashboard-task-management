import { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Header from "./components/layout/Header";
import TaskColumn from "./components/tasks/TaskColumn";
import type { Task } from "./types/types";
import { columns } from "./utils/constans";
import { API_URL } from "./config/apiConfig";
import "bootstrap/dist/css/bootstrap.min.css";

// Helper Functions
const fetchTasks = async (search: string): Promise<Task[]> => {
  const endpoint = search.trim()
    ? `${API_URL}?q=${encodeURIComponent(search)}`
    : API_URL;

  const { data } = await axios.get(endpoint);
  console.log("Data task", data)
  return data;
};

export default function KanbanBoard() {
  // Local State
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const queryClient = useQueryClient();
  // Debounced Search Effect
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  //  React Query — Fetch Tasks
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["tasks", debouncedSearch],
    queryFn: () => fetchTasks(debouncedSearch),
    staleTime: 1000 * 30, 
  });

//   Mutation — Add Task
  const addTaskMutation = useMutation({
    mutationFn: (task: Omit<Task, "id">) =>
      axios.post<Task>(API_URL, task).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // Memoized Columns
  const renderedColumns = useMemo(
    () =>
      columns.map((col, idx) => (
        <TaskColumn
          key={col.key}
          col={col}
          tasks={tasks}
          columns={columns}
          idx={idx}
        />
      )),
    [columns, tasks]
  );

    // 🔹 Conditional UI States
  const renderContent = useCallback(() => {
    if (isLoading) {
      return <p className="text-center text-muted">Loading tasks...</p>;
    }
    if (isError) {
      return <p className="text-center text-danger">Failed to load tasks.</p>;
    }
    if (tasks.length === 0) {
      return <p className="text-center text-muted">No tasks found.</p>;
    }
    return <Row>{renderedColumns}</Row>;
  }, [isLoading, isError, tasks, renderedColumns]);

    // Render
  return (
    <main className="bg-light min-vh-100">
      <Container fluid="xxl" className="py-4">
        <h1 className="fw-bold mb-4 text-center">Kanban Board</h1>

        <Card className="shadow-sm border-0">
          <Card.Body>
            {/* Header Section */}
            <Header
              search={search}
              setSearch={setSearch}
              addTaskMutation={addTaskMutation}
            />

            <hr className="border-secondary-subtle" />

            {/* Kanban Columns */}
            {renderContent()}
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}
