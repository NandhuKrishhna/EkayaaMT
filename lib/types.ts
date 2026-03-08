export type TodoStatus = "Pending" | "Completed";

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
}
