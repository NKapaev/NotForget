import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export default function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const hideToast = (toastId) => {
        setToasts(prev =>
            prev.map(toast =>
                toast.id === toastId
                    ? { ...toast, visible: false }
                    : toast
            )
        );

        setTimeout(() => {
            removeToast(toastId);
        }, 300);
    };

    const removeToast = (id) => {
        setToasts(prev =>
            prev.filter(t => t.id !== id)
        );
    };

    const addToast = ({ title, type, onUndo, onConfirm, duration = 5000 }) => {
        const id = crypto.randomUUID();

        const timeoutId = setTimeout(async () => {
            try { await onConfirm?.() }
            finally { hideToast(id) }

        }, duration);

        setToasts(prev => [
            ...prev,
            {
                id,
                type,
                title,
                onUndo,
                onConfirm,
                timeoutId,
                visible: true
            }
        ]);
    };

    const undoToast = (toastId) => {
        const toast =
            toasts.find(
                t => t.id === toastId
            );

        if (!toast) return;

        clearTimeout(toast.timeoutId);
        toast.onUndo?.();
        hideToast(toastId);
    };

    const confirmToast = async (toastId) => {
        const toast = toasts.find(t => t.id === toastId)
        if (!toast) return

        clearTimeout(
            toast.timeoutId
        );

        await toast.onConfirm?.();

        hideToast(toastId);
    }

    return (
        <ToastContext.Provider
            value={{
                toasts,
                addToast,
                undoToast,
                confirmToast
            }}
        >
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = () =>
    useContext(ToastContext);