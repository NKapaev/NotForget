import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "../components/toast/toastContext";
import { deleteTaskListRequest } from "../utils/deleteTaskListRequest"
import { useParams } from "react-router-dom";

export default function useDeleteTaskList() {
    const { id } = useParams()
    const queryClient = useQueryClient();
    const { addToast } = useToast();
    const queryKey = ["taskLists", id];

    const deleteTaskList = (taskList) => {
        const previousTaskLists = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(
            queryKey,
            old =>
                old.filter(tl => tl.id !== taskList.id)
        );

        addToast({
            type: "taskList",
            title: taskList.title,

            onUndo: () => {
                queryClient.setQueryData(
                    queryKey,
                    previousTaskLists
                );
            },

            onConfirm: async () => {
                await deleteTaskListRequest(taskList.id)
            }
        });


    };

    return deleteTaskList;
}