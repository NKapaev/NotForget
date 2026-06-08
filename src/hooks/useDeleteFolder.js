import { useQueryClient } from "@tanstack/react-query";
import { deleteFolderRequest } from "../utils/deleteFolderRequest";
import { useToast } from "../components/toast/toastContext";

export default function useDeleteFolder(folderId) {
    const queryClient = useQueryClient()
    const { addToast } = useToast()
    const queryKey = ["folders", folderId]

    const deleteFolder = (folder) => {
        const previousFolders = queryClient.getQueryData(queryKey)

        queryClient.setQueryData(
            queryKey,
            old => old.filter(f => f.id !== folder.id)
        );

        addToast({
            type: "folder",
            title: folder.title,

            onUndo: () => {
                queryClient.setQueryData(
                    queryKey,
                    previousFolders
                )
            },

            onConfirm: async () => {
                await deleteFolderRequest(folder.id);
            }


        })


    }
    return deleteFolder;
}