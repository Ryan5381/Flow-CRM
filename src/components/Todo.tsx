import {
  Empty,
  Button,
  Checkbox,
  Pagination,
  Select,
  Popconfirm,
  Spin,
  message,
} from "antd";
import { useState, useMemo } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useTodos } from "../hooks/useTodos";
import AddTodoModal from "./AddTodoModal";

type SortType = "dueDate" | "created" | "status";

const TodoSection = () => {
  const { todos, isLoading, updateTodoStatus, deleteTodo } = useTodos();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState<SortType>("dueDate");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      await updateTodoStatus({ id, completed: !todo.completed });
      message.success("更新成功");
    } catch (error) {
      message.error("更新失敗");
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      
      // 如果刪除後當前頁沒有數據，回到上一頁 (這部分現在由 todos 長度自動觸發 useMemo)
      const newTodosCount = todos.length - 1;
      const maxPage = Math.ceil(newTodosCount / pageSize);
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage);
      }

      message.success("刪除成功");
    } catch (error) {
      message.error("刪除失敗");
      console.error(error);
    }
  };

  // 排序邏輯
  const sortedTodos = useMemo(() => {
    const sorted = [...todos];
    switch (sortBy) {
      case "dueDate":
        return sorted.sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        );
      case "created":
        return sorted.sort((a, b) => a.id - b.id);
      case "status":
        return sorted.sort((a, b) => {
          if (a.completed === b.completed) return 0;
          return a.completed ? 1 : -1;
        });
      default:
        return sorted;
    }
  }, [todos, sortBy]);

  // 分頁邏輯
  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedTodos.slice(startIndex, startIndex + pageSize);
  }, [sortedTodos, currentPage, pageSize]);

  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page);
    if (newPageSize) {
      setPageSize(newPageSize);
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" tip="載入中..." />
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">待辦事項</h2>

            <div className="flex items-center gap-3">
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: 120 }}
                options={[
                  { value: "dueDate", label: "依到期日" },
                  { value: "created", label: "依建立時間" },
                  { value: "status", label: "依狀態" },
                ]}
              />
              <Button
                type="primary"
                size="middle"
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
                style={{ color: "#fff", backgroundColor: "#999" }}
              >
                新增待辦
              </Button>
            </div>
          </div>

          {todos.length === 0 ? (
            <div className="py-10">
              <Empty description="目前沒有待辦事項" />
            </div>
          ) : (
            <>
              <ul className="space-y-3">
                {paginatedTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-3"
                  >
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <div className="flex flex-1 flex-col">
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
                    <Popconfirm
                      title="確定要刪除這個待辦事項嗎？"
                      onConfirm={() => handleDeleteTodo(todo.id)}
                      okText="確定"
                      cancelText="取消"
                    >
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                      />
                    </Popconfirm>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-center">
                <Pagination
                  current={currentPage}
                  total={todos.length}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  onShowSizeChange={handlePageChange}
                  showSizeChanger
                  showTotal={(total) => `共 ${total} 項`}
                  pageSizeOptions={[5, 10, 20, 50]}
                />
              </div>
            </>
          )}

          <AddTodoModal
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
          />
        </>
      )}
    </section>
  );
};

export default TodoSection;
