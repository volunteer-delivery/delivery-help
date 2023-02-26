export const MONTHS = [
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
    'Грудня',
];

export function formatDate(dateString: string): string;
export function formatDate(date: Date): string;
export function formatDate(dateOrString: string | Date): string {
    const date = dateOrString instanceof Date ? dateOrString : new Date(dateOrString);
    const formatter = new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'long',
    });
    return formatter.format(date);
}
