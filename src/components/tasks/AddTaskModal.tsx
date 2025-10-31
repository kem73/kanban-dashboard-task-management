import { useState, useCallback } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Task } from "../../types/types";

interface AddTaskModalProps {
  addTaskMutation: UseMutationResult<Task, Error, Omit<Task, "id">, unknown>;
}


function AddTaskModal({ addTaskMutation }: AddTaskModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);

  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    column: "backlog",
  });

  // HANDLERS
  const handleOpen = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setValidated(false);
  }, []);

  const handleChange = useCallback(
    (field: keyof Omit<Task, "id">, value: string) => {
      setNewTask((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSave = useCallback(() => {
    const isInvalid = !newTask.title.trim() || !newTask.description.trim();

    if (isInvalid) {
      setValidated(true);
      return;
    }

    addTaskMutation.mutate(newTask, {
      onSuccess: () => {
        setNewTask({ title: "", description: "", column: "backlog" });
        handleClose();
      },
    });
  }, [newTask, addTaskMutation, handleClose]);

  //  RENDER
  return (
    <>
      {/* Add Button */}
      <Button
        variant="primary"
        onClick={handleOpen}
        aria-label="Add New Task"
      >
        + Add Task
      </Button>

      {/* Add Task Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated}>
            {/* Title Field */}
            <Form.Group className="mb-3" controlId="addTaskTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Title is required.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Description Field */}
            <Form.Group className="mb-3" controlId="addTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={newTask.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Description is required.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Column Field */}
            <Form.Group controlId="addTaskColumn">
              <Form.Label>Column</Form.Label>
              <Form.Select
                value={newTask.column}
                onChange={(e) => handleChange("column", e.target.value)}
              >
                <option value="backlog">Backlog</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={addTaskMutation.isPending}
          >
            {addTaskMutation.isPending ? "Saving..." : "Save Task"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTaskModal;
