import { useRef } from "react";

export function useFadeToggle(duration = 300, display = "block") {
    const ref = useRef(null);

    const hide = () => {
        const el = ref.current;
        if (!el) return;

        el.style.transform = "translateY(-50px)"
        el.style.opacity = "0";
        el.style.transition = `all ${duration}ms ease`;

        const onEnd = () => {
            el.style.display = "none";
            el.removeEventListener("transitionend", onEnd);
        };

        el.addEventListener("transitionend", onEnd);
    };

    const show = () => {
        const el = ref.current;
        if (!el) return;

        el.style.display = display;
        el.style.opacity = "0";

        requestAnimationFrame(() => {
            el.style.transform = "translateY(0)"
            el.style.transition = `all ${duration}ms ease`;

            el.style.opacity = "1";
        });
    };

    return { ref, hide, show };
}