export default function validateField(name, value, allValues) {
    switch (name) {
        case "email":
            if (value.length === 0) return
            if (!value) return "Email обов'язковий";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Некоректний email";
            return "";

        case "password":
            if (value.length === 0) return
            if (value.length < 6) return "Пароль надто короткий";

            if (allValues.confirmPassword && allValues.confirmPassword !== value) {
                return "Паролі не збігаються";
            }
            return "";

        case "confirmPassword":
            if (!value) return;
            if (allValues.password.length > 0 && !value) return
            if (value !== allValues.password && allValues.password.length === 0) return;
            if (value !== allValues.password) return "Паролі не збігаються";
            return "";

        default:
            return "";
    }
}