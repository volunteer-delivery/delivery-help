import { setLocale } from 'yup';

export default defineNuxtPlugin(() => {
    setLocale({
        mixed: {
            required: 'Це поле обовʼязкове',
        },
    });
});
