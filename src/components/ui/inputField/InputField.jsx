import styles from "./inputField.module.css";
import useUrlPreviewData from "../../../hooks/useUrlPreviewData";
import UrlPreviewCard from "../urlPreviewCard/UrlPreviewCard";
import { useState, useRef, use } from "react";


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
    const parsedUrl = useUrlPreviewData(value, listenUrl);
    const [showPassword, setShowPassword] = useState(false)

    const inputType = (type === "password" && showPassword) ? "text" : type;

    const containerClasses = [
        styles.input,
        className,
        parsedUrl ? styles.withPreview : ""
    ].join(" ");

    return (
        <>
            <div className={containerClasses}>
                {listenUrl && parsedUrl && (

                    < UrlPreviewCard previewData={parsedUrl} />
                )}

                {type === "textarea" ? (
                    <textarea rows="5" value={value} onChange={onChange} placeholder=" " name={name} id={placeholder} />
                ) : (
                    <>
                        <input
                            value={value}
                            onChange={onChange}
                            placeholder=" "
                            name={name}
                            id={placeholder}
                            type={inputType} // Используем вычисленный тип
                        />
                        {type === "password" && (
                            <button
                                type="button"
                                className={styles.showPasswordButton}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <svg className={`${styles.eyeIcon} ${showPassword ? styles.visible : ""}`}>
                                    <use href="/icons/eye-close.svg"></use>
                                </svg>
                                <svg className={`${styles.eyeIcon} ${styles.visible}`}>
                                    <use href="/icons/eye.svg"></use>
                                </svg>
                            </button>
                        )}
                    </>
                )}

                <label htmlFor={placeholder}>{placeholder}</label>
            </div >
            {error && <p className={styles.fieldError}>{error}</p>
            }
        </>
    );
}