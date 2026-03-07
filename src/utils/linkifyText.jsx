export const linkifyText = (text) => {
    const urlRegex = /((?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.(?:[a-zA-Z]{2,13})(?:\/[^\s]*)?)/gi;

    return text.split(urlRegex).map((part, index) => {
        if (part && part.match(urlRegex)) {
            // 1. Находим знаки препинания в конце захваченной ссылки
            const punctuationMatch = part.match(/[.,!?;:]+$/);
            const punctuation = punctuationMatch ? punctuationMatch[0] : '';

            // 2. Очищаем саму ссылку от этих знаков
            const cleanUrl = part.substring(0, part.length - punctuation.length);

            // 3. Формируем корректный href
            const href = cleanUrl.toLowerCase().startsWith('http')
                ? cleanUrl
                : `https://${cleanUrl}`;

            return (
                <span key={index}>
                    <a className="link" href={href} target="_blank" rel="noopener noreferrer">
                        {cleanUrl}
                    </a>
                    {/* 4. Возвращаем знаки препинания в обычный текст */}
                    {punctuation}
                </span>
            );
        }
        return part;
    });
};