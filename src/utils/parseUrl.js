export default async function getData(url) {
    try {
        const response = await fetch('https://parcer-z03h.onrender.com/get-metadata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        console.log("Данные с нашего сервера:", data);
        return data;
    } catch (err) {
        console.error("Ошибка:", err);
    }
};