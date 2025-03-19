export function getCookie(name) {
  const cookieArr = document.cookie.split(';');

  for (let cookie of cookieArr) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
