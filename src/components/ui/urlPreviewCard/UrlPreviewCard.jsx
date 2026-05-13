import styles from "./urlPreviewCard.module.css"

export default function UrlPreviewCard({ previewData, borderRounded = false, className = "" }) {

    return (
        < a
            className={`${styles.urlPreview} ${borderRounded ? styles.borderRounded : ""} ${className ? className : ""} link`
            } href={previewData.url} target="_blank" rel="noopener noreferrer" >
            {previewData.image && <img className={styles.urlPreviewImageContainer} src={previewData.image} alt="" />}

            <div>
                {previewData.title && <h3 className={styles.previewTitle}>{previewData.title}</h3>}
                {previewData.description && <p className={styles.previewDescription}>{previewData.description}</p>}
            </div>
        </a >
    )
}