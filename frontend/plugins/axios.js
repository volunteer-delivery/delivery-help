export default function (context) {
    context.$axios.onError(error => {
        if (!error.response) return error;
        return Promise.reject(error.response.data);
    });
}
