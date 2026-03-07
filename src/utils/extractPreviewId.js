import supabase from "./supabase"
import getUrlPreviewData from "./getUrlPreviewData"

export default async function extractPreviewId(content) {

    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-z0-9.-]+\.[a-z]{2,})/gi
    const match = content?.match(urlRegex)

    if (!match) return null

    const url = match[0]

    const previewData = await getUrlPreviewData(url)

    if (previewData?.id) {
        return previewData.id
    }

    if (previewData?.isNew) {

        const { data, error } = await supabase
            .from("link_previews")
            .upsert({
                url: previewData.url,
                title: previewData.title,
                description: previewData.description,
                image_url: previewData.image,
                status: "success"
            }, { onConflict: "url" })
            .select("id")
            .single()

        if (error) throw error

        return data.id
    }

    return null
}