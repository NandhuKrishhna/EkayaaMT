"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "./components/ui/Header";
import TodoCard from "./components/todo/TodoCard";
import TodoDefaultCanvas from "./components/todo/TodoDefaultCanvas";
import { useTodos } from "@/lib/useTodos";

export default function Home() {
  const { todos, isLoaded, deleteTodo, editTodo } = useTodos();
  const [search, setSearch] = useState<string>("");
  // create a search bar to filter todos by title
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  /**
   * 2 : debounce function to search;
   * 3 : use memo for filtered todos list to avoid unnecessary re-renders
   */

  const filteredTodos = useMemo(() => {
    if (!debounce.trim()) return todos;
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(debounce.toLowerCase()),
    );
  }, [debounce, todos]);

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
      <div>
        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {todos.length === 0 ? (
        <TodoDefaultCanvas />
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTodos.map((todo) => (
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
