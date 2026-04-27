import { extractLink } from "./extractLink";

const URL_REGEX = /((?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.(?:[a-zA-Z]{2,13})(?:\/[^\s]*)?)/gi;


export const linkifyText = (text, excludeLink = null) => {
    if (!extractLink(text)) return text;

    return text.split(URL_REGEX).map((part, index) => {
        const foundLink = extractLink(part);

        if (foundLink) {
            // Если эта ссылка должна быть исключена — просто не возвращаем ничего
            if (excludeLink && foundLink === excludeLink) {
                return null;
            }

            const href = foundLink.toLowerCase().startsWith('http')
                ? foundLink
                : `https://${foundLink}`;

            const punctuation = part.substring(foundLink.length);

            return (
                <span key={index}>
                    <a className="link" href={href} target="_blank" rel="noopener noreferrer">
                        {foundLink}
                    </a>
                    {punctuation}
                </span>
            );
        }
        return part;
    });
};