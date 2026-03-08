import { TODOS_KEY } from "@/constants/todo";
import { Todo } from "./types";
import React from "react";
import { useRouter } from "next/navigation";

export function useTodos() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const router = useRouter();
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(TODOS_KEY);
      if (stored) {
        setTodos(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load todos from local storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    try {
      localStorage.setItem(TODOS_KEY, JSON.stringify(newTodos));
    } catch (e) {
      console.error("Failed to save todos to local storage", e);
    }
  };

  const addTodo = (todo: Omit<Todo, "id">) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
    };
    saveTodos([...todos, newTodo]);
  };

  const updateTodo = (id: string, updatedFields: Partial<Omit<Todo, "id">>) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedFields } : todo,
    );
    saveTodos(newTodos);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(newTodos);
  };
  const editTodo = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const getTodo = (id: string): Todo | undefined => {
    return todos.find((todo) => todo.id === id);
  };

  return {
    todos,
    isLoaded,
    addTodo,
    updateTodo,
    deleteTodo,
    getTodo,
    editTodo,
  };
}
