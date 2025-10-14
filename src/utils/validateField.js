export default function validateField(name, value, allValues) {
    switch (name) {
        case "email":
            if (!value) return "Email обязателен";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Некорректный email";
            return "";

        case "password":
            if (value.length < 6) return "Пароль слишком короткий";
            // Если уже есть confirmPassword, проверим сразу
            if (allValues.confirmPassword && allValues.confirmPassword !== value) {
                return "Пароли не совпадают";
            }
            return "";

        case "confirmPassword":
            if (!value) return "Повторите пароль";
            if (value !== allValues.password) return "Пароли не совпадают";
            return "";

        default:
            return "";
    }
}