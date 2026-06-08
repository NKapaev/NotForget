import supabase from "./supabase";

export async function deleteTaskListRequest(id) {
    const { error } = await supabase
        .from("taskLists")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }
}