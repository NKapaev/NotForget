export default function translateError(error) {
    if (!error) return null;

    const message = error.toLowerCase() || '';

    // Проверяем по содержанию сообщения
    if (message.includes('invalid login credentials') ||
        message.includes('invalid password') ||
        message.includes('invalid email') ||
        message.includes('missing email or phone')) {
        return 'Невірний email або пароль';
    }

    if (message.includes('email not confirmed')) {
        return 'Будь ласка, підтвердіть ваш email';
    }

    if (message.includes('user not found')) {
        return 'Користувача не знайдено';
    }

    if (message.includes('too many requests')) {
        return 'Забагато спроб. Зачекайте декілька хвилин';
    }

    return 'Сталася помилка. Спробуйте ще раз';
};