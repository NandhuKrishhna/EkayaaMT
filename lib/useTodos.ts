import React from "react";
import { TODOS_KEY } from "@/constants/todo";
import { Todo } from "./types";
import { useRouter } from "next/navigation";

export function useTodos() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const router = useRouter();

  // sorting todos by priority: High > Medium > Low
  // 2: If both have same priority, sort by creation time (newest first)
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(TODOS_KEY);
      if (stored) {
        console.log("Loaded todos from local storage:", JSON.parse(stored));
        const parsedTodos = JSON.parse(stored) as Todo[];
        const normalizedTodos = parsedTodos.map((todo) => ({
          ...todo,
          priority: todo.priority ?? "Low",
        }));
        const priorityOrder: Record<string, number> = {
          High: 3,
          Medium: 2,
          Low: 1,
        };
        const sortedTodos = [...normalizedTodos].sort((a, b) => {
          const p = priorityOrder[a.priority];
          const q = priorityOrder[b.priority];
          if (p !== q) return q - p;
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        setTodos(sortedTodos);
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
