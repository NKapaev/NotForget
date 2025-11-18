export default function validateField(name, value, allValues) {
    switch (name) {
        case "email":
            if (!value) return "Email обов'язковий";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "некоректний email";
            return "";

        case "password":
            if (value.length < 6) return "Пароль надто короткий";

            if (allValues.confirmPassword && allValues.confirmPassword !== value) {
                return "Паролі не збігаються";
            }
            return "";

        case "confirmPassword":
            if (!value) return "Повторіть пароль";
            if (value !== allValues.password) return "Паролі не збігаються";
            return "";

        default:
            return "";
    }
}