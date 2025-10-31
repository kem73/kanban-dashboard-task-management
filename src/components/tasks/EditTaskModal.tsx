import { useState, useCallback } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Task } from "../../types/types";

interface EditTaskModalProps {
  task: Task;
  editTaskMutation: UseMutationResult<Task, Error, Task, unknown>;
}


function EditTaskModal({ task, editTaskMutation }: EditTaskModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [editingTask, setEditingTask] = useState<Task>(task);

  //  HANDLERS

  const handleOpen = useCallback(() => {
    setEditingTask(task);
    setShowModal(true);
  }, [task]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setValidated(false);
  }, []);

  const handleChange = useCallback(
    (field: keyof Task, value: string) => {
      setEditingTask((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSave = useCallback(() => {
    const isInvalid =
      !editingTask.title.trim() || !editingTask.description.trim();

    if (isInvalid) {
      setValidated(true);
      return;
    }

    editTaskMutation.mutate(editingTask, {
      onSuccess: handleClose,
    });
  }, [editingTask, editTaskMutation, handleClose]);

    //  RENDER
  return (
    <>
      {/* Edit Button */}
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={handleOpen}
        aria-label="Edit Task"
      >
        <Pencil />
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated}>
            {/* Title */}
            <Form.Group className="mb-3" controlId="formTaskTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={editingTask.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Title is required.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3" controlId="formTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={editingTask.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Description is required.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Column */}
            <Form.Group controlId="formTaskColumn">
              <Form.Label>Column</Form.Label>
              <Form.Select
                value={editingTask.column}
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
            disabled={editTaskMutation.isPending}
          >
            {editTaskMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTaskModal;
