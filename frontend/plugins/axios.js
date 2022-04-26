export default function (context) {
    context.$axios.onError(error => {
        if (!error.response) return error;

        if (error.response.status === 403) {
            window.location.reload();
        }

        return Promise.reject(error.response.data);
    });
}
