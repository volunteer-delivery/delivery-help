function isBrowserCookieExists(cookieName) {
    return document.cookie.includes(cookieName + '=');
}

export default function (context) {
    const isPublicRoute = context.route.meta.some(meta => meta.auth === 'public');

    if (isPublicRoute) return;

    if (!isBrowserCookieExists('dh.session')) context.redirect('/sign-in');
}
