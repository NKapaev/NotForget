import styles from "./urlPreviewCard.module.css"

export default function UrlPreviewCard({ previewData, borderRounded = false, className = "" }) {

    return (
        < a
            className={`${styles.urlPreview} ${borderRounded ? styles.borderRounded : ""} ${className ? className : ""} link`
            } href={previewData.url} target="_blank" rel="noopener noreferrer" >
            <img className={styles.urlPreviewImageContainer} src={previewData.image_url || previewData.image} alt="" />
            <div>
                <h3 className={styles.previewTitle}>{previewData.title}</h3>
                <p className={styles.previewDescription}>{previewData.description}</p>
            </div>
        </a >
    )
}