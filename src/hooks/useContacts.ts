import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../services/contactService";
import type { ContactData } from "../types/data";

export const useContacts = () => {
  const queryClient = useQueryClient();

  // 取得聯絡人
  const contactsQuery = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  // 新增聯絡人
  const addContactMutation = useMutation({
    mutationFn: (newContact: Omit<ContactData, "id" | "created_at">) =>
      addContact(newContact),
    onSuccess: () => {
      message.success("聯絡人已新增");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error: any) => {
      message.error(error.message || "新增失敗");
    },
  });

  // 更新聯絡人
  const updateContactMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<ContactData>;
    }) => updateContact(id, updates),
    onSuccess: () => {
      message.success("聯絡人已更新");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: () => {
      message.error("更新失敗");
    },
  });

  // 刪除聯絡人
  const deleteContactMutation = useMutation({
    mutationFn: (id: number) => deleteContact(id),
    onSuccess: () => {
      message.success("聯絡人已刪除");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: () => {
      message.error("刪除失敗");
    },
  });

  return {
    contacts: contactsQuery.data || [],
    isLoading: contactsQuery.isLoading,
    isAdding: addContactMutation.isPending,
    addContact: addContactMutation.mutate,
    isUpdating: updateContactMutation.isPending,
    updateContact: updateContactMutation.mutate,
    deleteContact: deleteContactMutation.mutate,
  };
};
