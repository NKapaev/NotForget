import { useState, useEffect, useRef } from "react";

export default function useScrollArrows(dependency) {
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);
    const contentRef = useRef(null);

    const updateScrollState = () => {
        const el = contentRef.current;
        if (!el) return;

        const scrollTop = el.scrollTop > 1;
        const scrollBottom = el.scrollTop + el.clientHeight < el.scrollHeight - 1;

        setCanScrollUp(scrollTop);
        setCanScrollDown(scrollBottom);
    };

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        updateScrollState();

        el.addEventListener("scroll", updateScrollState);
        window.addEventListener("resize", updateScrollState);

        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [dependency]);

    return { contentRef, canScrollUp, canScrollDown, updateScrollState };
}