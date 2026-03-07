import styles from "./inputField.module.css";
import useUrlPreviewData from "../../../hooks/useUrlPreviewData";
import UrlPreviewCard from "../urlPreviewCard/UrlPreviewCard";

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

    const containerClasses = [
        styles.input,
        className,
        parsedUrl ? styles.withPreview : ""
    ].join(" ");

    return (
        <>
            {console.log(parsedUrl)}
            <div className={containerClasses}>
                {listenUrl && parsedUrl && (

                    < UrlPreviewCard previewData={parsedUrl} />
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