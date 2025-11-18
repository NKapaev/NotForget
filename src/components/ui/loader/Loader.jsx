import "./loader.css"

export default function Loader() {
    return (
        <div className="loader">
            <svg>
                <use href="/icons/loader.svg"></use>
            </svg>
        </div>
    )
}