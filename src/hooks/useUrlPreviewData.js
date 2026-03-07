import { useState, useEffect } from "react";
import getUrlPreviewData from "../utils/getUrlPreviewData";

const URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+(?:\.[^\s]+)+|[a-z0-9-]+\.(?:com|net|org|edu|gov|io|me|ru|uk|ua|online|space)(?:\/[^\s]*)?)/gi;

export default function useUrlPreviewData(value, enabled = false) {
    const [previewData, setPreviewData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        if (!enabled || !value) {
            setPreviewData(null);
            return;
        }

        const fetchData = async () => {
            const matches = value.match(URL_REGEX);
            if (!matches) {
                if (isMounted) setPreviewData(null);
                return;
            }

            const data = await getUrlPreviewData(matches[0]); // берем первую ссылку
            if (isMounted) setPreviewData(data);
        };

        const timer = setTimeout(fetchData, 200); // чуть увеличили задержку для комфорта
        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [value, enabled]);

    return previewData;
}