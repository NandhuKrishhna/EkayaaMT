"use client";

import { useTodos } from "@/lib/useTodos";
import TodoCard from "./components/todo/TodoCard";
import TodoDefaultCanvas from "./components/todo/TodoDefaultCanvas";
import Header from "./components/ui/Header";

export default function Home() {
  const { todos, isLoaded, deleteTodo, editTodo } = useTodos();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Header />

      {todos.length === 0 ? (
        <TodoDefaultCanvas />
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
