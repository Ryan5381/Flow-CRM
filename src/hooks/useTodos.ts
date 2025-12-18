import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, updateTodoStatus, deleteTodo } from "../services/todoService";

export const useTodos = () => {
  const queryClient = useQueryClient();

  // 取得待辦事項
  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // 更新完成狀態
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      updateTodoStatus(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // 刪除待辦事項
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos,
    isLoading,
    error,
    updateTodoStatus: updateStatusMutation.mutateAsync,
    deleteTodo: deleteMutation.mutateAsync,
    isUpdating: updateStatusMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
