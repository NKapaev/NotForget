import { useState, useEffect } from "react";
import styles from "./inputField.module.css";
import parseUrl from "../../../utils/parseUrl";

// Выносим регулярку за пределы компонента, чтобы она не пересоздавалась
const URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-z0-9.-]+\.[a-z]{2,})/gi;

export default function InputField({
    className = "",
    type = "text",
    name,
    error,
    placeholder,
    listenUrl = false,
    value = "",
    onChange
}) {
    const [parsedUrl, setParsedUrl] = useState(null);

    useEffect(() => {
        // Если функция отключена или строка пустая — сбрасываем превью
        if (!listenUrl || !value) {
            setParsedUrl(null);
            return;
        }

        const fetchData = async () => {
            const matches = value.match(URL_REGEX);

            if (matches) {
                const data = await parseUrl(matches[0]);
                // Если данных нет или ошибка — обнуляем, иначе сохраняем
                setParsedUrl(data?.error ? null : data);
            } else {
                setParsedUrl(null);
            }
        };

        // Можно добавить небольшой debounce, чтобы не спамить запросами при каждом символе
        const timer = setTimeout(fetchData, 500);
        return () => clearTimeout(timer);

    }, [value, listenUrl]);

    // Определяем CSS классы заранее
    const containerClasses = [
        styles.input,
        className,
        parsedUrl ? styles.withPreview : ""
    ].join(" ");

    return (
        <>
            <div className={containerClasses}>
                {listenUrl && parsedUrl && (
                    <div className={styles.urlPreview}>
                        <img className={styles.urlPreviewImageContainer} src={parsedUrl.image} alt="" />
                        <div>
                            <h3 className={styles.previewTitle}>{parsedUrl.title}</h3>
                            <p className={styles.previewDescription}>{parsedUrl.description}</p>
                        </div>
                    </div>
                )}

                {type === "textarea" ? (
                    <textarea rows="5" value={value} onChange={onChange} placeholder=" " name={name} id={placeholder} />
                ) : (
                    <input value={value} onChange={onChange} placeholder=" " name={name} id={placeholder} type={type} />
                )}

                <label htmlFor={placeholder}>{placeholder}</label>
            </div>
            {error && <p className={styles.fieldError}>{error}</p>}
        </>
    );
}