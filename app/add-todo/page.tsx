"use client";

import BackButton from "../components/ui/BackButton";
import TodoForm from "../components/todo/TodoForm";
import { TodoStatus } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useTodos } from "@/lib/useTodos";

export default function AddTodo() {
  const router = useRouter();
  const { addTodo } = useTodos();

  const handleSubmit = (data: {
    title: string;
    description: string;
    status: TodoStatus;
    priority: "Low" | "Medium" | "High";
    createdAt: string;
  }) => {
    addTodo(data);
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <BackButton />

      <div className="glass-panel rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
          Create New Todo
        </h1>

        <TodoForm
          onSubmit={handleSubmit}
          submitButtonText="Save Form"
          onCancelHref="/"
        />
      </div>
    </div>
  );
}
