const URL_REGEX = /((?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.(?:[a-zA-Z]{2,13})(?:\/[^\s]*)?)/gi;

export const extractLink = (text) => {
    if (!text) return null;

    const match = text.match(URL_REGEX);

    // Если совпадения есть, возвращаем первую найденную ссылку (без знаков препинания в конце)
    if (match) {
        const rawUrl = match[0];
        const punctuationMatch = rawUrl.match(/[.,!?;:]+$/);
        const punctuationLength = punctuationMatch ? punctuationMatch[0].length : 0;

        return rawUrl.substring(0, rawUrl.length - punctuationLength);
    }

    return null;
};