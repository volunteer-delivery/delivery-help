export function formatDate(dateString: string) {
    const date = new Date(dateString);

    const month = [
        'Січня',
        'Лютого',
        'Березня',
        'Квітня',
        'Травня',
        'Червня',
        'Липня',
        'Серпня',
        'Вересня',
        'Жовтня',
        'Листопада',
        'Грудня'
    ][date.getMonth()];

    return `${date.getDate()} ${month}`;
}
