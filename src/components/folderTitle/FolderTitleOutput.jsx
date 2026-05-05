import styles from "./folderTitleOutput.module.css"

import { useState, useEffect, useRef } from 'react';

export default function FolderTitleOutput({ title, isExiting }) {
    const tickerRef = useRef(null);
    const [offset, setOffset] = useState(0);
    const [displayTitle, setDisplayTitle] = useState("");

    // Храним заголовок, чтобы он не пропадал при анимации выхода
    useEffect(() => {
        if (title) {
            setDisplayTitle(title);
        }
    }, [title]);

    // Расчет дистанции для пинг-понга
    useEffect(() => {
        const timer = setTimeout(() => {
            if (tickerRef.current) {
                const containerWidth = tickerRef.current.offsetWidth;
                const textElement = tickerRef.current.querySelector('h2');

                if (textElement) {
                    const textWidth = textElement.scrollWidth;
                    if (textWidth > containerWidth) {
                        setOffset(containerWidth - textWidth - 20);
                    } else {
                        setOffset(0);
                    }
                }
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [displayTitle]);

    return (
        <div
            className={`${styles.tickerWindow} ${isExiting ? styles.fadeOut : ''}`}
            ref={tickerRef}
        >
            <h2
                className={`${styles.folderNameOutput} ${offset < 0 ? styles.pingPongAnimation : ''}`}
                style={{ '--move-distance': `${offset}px` }}
            >
                {displayTitle}
            </h2>
        </div>
    );

}