import supabase from "./supabase";

export async function deleteFolderRequest(id) {
    const { error } = await supabase
        .from("folders")
        .delete()
        .eq("id", id);
    if (error) {
        throw error
    }
}