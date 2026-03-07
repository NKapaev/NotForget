import supabase from "./supabase";

export default async function getUrlPreviewData(url) {
    if (!url) return null;

    // 1. Очистка. Если пришел массив (от match), берем первый элемент

    const cleanUrl = (Array.isArray(url) ? url[0] : url).replace(/[.,!?;:]+$/, '');

    // 2. Проверка базы
    const { data: existing } = await supabase
        .from("link_previews")
        .select()
        .eq("url", cleanUrl)
        .maybeSingle();

    if (existing) {
        return existing
    }

    try {
        const response = await fetch('https://parcer-z03h.onrender.com/get-metadata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: cleanUrl })
        });

        const meta = await response.json();
        return { ...meta, url: cleanUrl, isNew: true };
    } catch (err) {
        return null
    }
}