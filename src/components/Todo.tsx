import { Empty, Button, Checkbox } from "antd";
import { useState } from "react";
import todosJson from "../data/todos.json";
import type { TodoData } from "../types/data";

const TodoSection = () => {
  const [todos, setTodos] = useState<TodoData[]>(todosJson as TodoData[]);

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">待辦事項</h2>

        <Button
          type="primary"
          size="middle"
          style={{ color: "#fff", backgroundColor: "#999" }}
        >
          新增待辦
        </Button>
      </div>

      {todos.length === 0 ? (
        <div className="py-10">
          <Empty description="目前沒有待辦事項" />
        </div>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items gap-3 rounded-lg border border-gray-100 px-3 py-3"
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <div className="flex flex-col">
                <span
                  className={`font-medium ${
                    todo.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </span>
                <span className="text-xs text-gray-500">
                  到期日：{todo.dueDate}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TodoSection;
