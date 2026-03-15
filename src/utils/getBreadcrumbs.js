import supabase from "./supabase";

export const fetchBreadcrumbs = async (folderId) => {
    if (!folderId) return [];

    const { data, error } = await supabase
        .rpc('get_folder_path', { target_folder_id: folderId });

    if (error) {
        console.error('Ошибка при загрузке хлебных крошек:', error.message);
        return [];
    }

    return data; // Возвращает массив [{id, name, ...}, ...]
};