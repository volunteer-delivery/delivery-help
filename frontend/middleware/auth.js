function isBrowserCookieExists(cookieName) {
  var d = new Date();
  d.setTime(d.getTime() + (1000));
  var expires = "expires=" + d.toUTCString();

  document.cookie = cookieName + "=new_value;path=/;" + expires;
  return document.cookie.indexOf(cookieName + '=') === -1;
}

const AUTH_COOKIE = 'dh.auth';


export default function (context) {
  const isPublicRoute = context.route.meta.some(meta => meta.auth === 'public');
  if (isPublicRoute) return;

  const isAuthenticated = process.client ? isBrowserCookieExists(AUTH_COOKIE) : !!context.$cookies.get(AUTH_COOKIE);
  if (!isAuthenticated) context.redirect('/sign-in');
}
