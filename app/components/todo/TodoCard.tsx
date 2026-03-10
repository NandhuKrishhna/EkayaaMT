import Button from "../ui/Button";
import { Todo } from "@/lib/types";
import { getPriorityBadge } from "@/constants/getPriorityBadge";
import { getStatusBadge } from "@/constants/getStatusBadge";

type TodoCardProps = {
  todo: Todo;
  editTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};
const TodoCard = ({ todo, editTodo, deleteTodo }: TodoCardProps) => {
  return (
    <li className="group relative flex flex-col justify-between glass-panel rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div>
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white wrap-break-word line-clamp-2">
            {todo.title}
          </h3>
          <div className="shrink-0">{getStatusBadge(todo.status)}</div>
        </div>
        {todo.description && (
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-3 wrap-break-word">
            {todo.description}
          </p>
        )}
        <div className="mt-2">{getPriorityBadge(todo.priority)}</div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-end gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <Button variant="secondary" size="sm" onClick={() => editTodo(todo.id)}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => deleteTodo(todo.id)}>
          Delete
        </Button>
      </div>
    </li>
  );
};

export default TodoCard;
