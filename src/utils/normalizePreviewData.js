export default function normalizePreviewData(raw) {
    if (!raw) return null;
    return {
        id: raw.id ?? null,
        url: raw.url ?? null,
        title: raw.title ?? null,
        description: raw.description ?? null,
        image: raw.image_url ?? raw.image ?? null, // нормализация в одном месте
    };
}