export function requireField() {
    return (value: string) => !!value || 'Це поле не може бути пустим';
}
