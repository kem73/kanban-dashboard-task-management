type Task = {
  id: number;
  title: string;
  description: string;
  column: string;
};

interface Column {
  key: string;
  title: string;
}

interface TaskColumnProps {
  col: Column;
  tasks: Task[];
  columns: Column[];
  idx: number;
}
export type { Task, Column, TaskColumnProps };
