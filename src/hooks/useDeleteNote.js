import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../components/toast/toastContext";
import { deleteNoteRequest } from "../utils/deleteNoteRequest";

export default function useDeleteNote(folderId, taskListId) {
    const queryClient = useQueryClient();
    const { addToast } = useToast();
    const queryKey = ["notes", folderId, taskListId];

    const deleteNote =
        (note) => {
            const previousNotes =
                queryClient.getQueryData(queryKey);

            // убираем из UI
            queryClient.setQueryData(
                queryKey,
                old =>
                    old.filter(
                        n =>
                            n.id !== note.id
                    )
            );

            addToast({
                type: "note",
                title: note.title,

                onUndo: () => {
                    queryClient.setQueryData(
                        queryKey,
                        previousNotes
                    );
                },
                onConfirm: async () => {
                    await deleteNoteRequest(note.id)
                }
            });


        };

    return deleteNote;
}