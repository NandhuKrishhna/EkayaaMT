"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTodos } from "@/lib/useTodos";
import { TodoStatus, Todo } from "@/lib/types";
import BackButton from "@/app/components/ui/BackButton";
import TodoForm from "@/app/components/todo/TodoForm";

export default function EditTodo() {
  const params = useParams();
  const { isLoaded, getTodo, updateTodo, deleteTodo } = useTodos();
  const id = params.id as string;

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const todo = getTodo(id);

  if (!todo) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Todo not found
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          The todo you&apos;re trying to edit doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <EditTodoForm todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
  );
}

function EditTodoForm({
  todo,
  updateTodo,
  deleteTodo,
}: {
  todo: Todo;
  updateTodo: (id: string, updatedFields: Partial<Omit<Todo, "id">>) => void;
  deleteTodo: (id: string) => void;
}) {
  const router = useRouter();

  const handleSubmit = (data: {
    title: string;
    description: string;
    status: TodoStatus;
  }) => {
    updateTodo(todo.id, data);
    router.push("/");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodo(todo.id);
      router.push("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <BackButton />

      <div className="glass-panel rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-bl-[100px] pointer-events-none" />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white relative z-10">
            Edit Todo
          </h1>
          <button
            type="button"
            onClick={handleDelete}
            title="Delete Todo"
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <TodoForm
          initialData={todo}
          onSubmit={handleSubmit}
          submitButtonText="Save Changes"
          onCancelHref="/"
        />
      </div>
    </div>
  );
}
