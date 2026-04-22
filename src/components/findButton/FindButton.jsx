import styles from "./findButton.module.css"
import { useState, useRef, useEffect, useCallback } from "react"
import debounce from "../../utils/debounce"

export default function FindButton({ className, onSearch }) {
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef(null)
    const [searchValue, setSearchValue] = useState('');

    const debouncedSearch = useCallback(
        debounce((value) => onSearch?.(value), 300),
        []
    );

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus()
        } else {
            inputRef.current?.blur()
            setSearchValue("")
            onSearch?.("")
        }
    }, [isOpen])

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        debouncedSearch(e.target.value);
    }

    return (
        <div
            className={`${styles.findButtonWrapper} ${isOpen ? styles.isOpen : ""} ${className || ""}`}
        >

            <button
                className={`${styles.findButton} ${isOpen ? styles.isOpen : ''}`}
                onClick={() => {
                    setIsOpen(!isOpen)
                }}
            >
                <svg className={`${styles.searchIcon} ${!isOpen ? styles.isOpen : ""}`} width="20px" height="20px" fill="var(--blue)">
                    <use width="20px" height="20px" href="/icons/search-icon.svg#search-icon"></use>
                </svg>
                <svg className={`${styles.crossIcon} ${isOpen ? styles.isOpen : ""}`} width="20px" height="20px">
                    <use width="20px" height="20px" href="/icons/cross-icon.svg#cross-icon"></use>
                </svg>
            </button>

            <input
                ref={inputRef}
                value={searchValue}
                onChange={(e) => { handleChange(e) }}
                onClick={(e) => e.stopPropagation()}
                className={`${styles.findInput} ${isOpen ? styles.isOpen : ""}`}
                type="text"
            />

        </div>
    )

}