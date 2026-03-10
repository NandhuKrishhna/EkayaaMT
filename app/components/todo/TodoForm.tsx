"use client";

import { Todo, TodoStatus } from "@/lib/types";

import Button from "../ui/Button";
import Link from "next/link";
import React from "react";

type TodoFormProps = {
  initialData?: Partial<Todo>;
  onSubmit: (data: {
    title: string;
    description: string;
    status: TodoStatus;
    priority: "Low" | "Medium" | "High";
    createdAt: string;
  }) => void;
  submitButtonText?: string;
  onCancelHref?: string;
};
// Add a new fild : Priority with options: Low, Medium, High
const TodoForm = ({
  initialData,
  onSubmit,
  submitButtonText = "Save",
  onCancelHref = "/",
}: TodoFormProps) => {
  const [title, setTitle] = React.useState(initialData?.title || "");
  const [description, setDescription] = React.useState(
    initialData?.description || "",
  );
  const [status, setStatus] = React.useState<TodoStatus>(
    initialData?.status || "Pending",
  );
  const [priority, setPriority] = React.useState<"Low" | "Medium" | "High">(
    initialData?.priority || "Low",
  );
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            className={`block w-full rounded-md border-0 py-2 text-slate-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ${
              error
                ? "ring-red-500 focus:ring-red-500"
                : "ring-slate-300 dark:ring-slate-700 focus:ring-blue-600 dark:focus:ring-blue-500"
            } placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all`}
            placeholder="Buy groceries..."
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200"
        >
          Description
        </label>
        <div className="mt-2">
          <textarea
            id="description"
            name="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-md border-0 py-2 text-slate-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all"
            placeholder="Milk, eggs, bread..."
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200"
        >
          Status
        </label>
        <div className="mt-2 text-black">
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TodoStatus)}
            className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="priority"
          className="block text-sm font-medium leading-6 text-slate-900 dark:text-slate-200"
        >
          Priority
        </label>
        <div className="mt-2 text-black">
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "Low" | "Medium" | "High")
            }
            className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-end gap-x-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          href={onCancelHref}
          className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          Cancel
        </Link>
        <Button type="submit" variant="primary">
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
