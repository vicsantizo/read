export function getAllCookies(): string[] {
  return document.cookie.split(';');
}

export function getCookie(cookieName: string): [string, string] | undefined {
  const cookies = getAllCookies();
  for (let i = 0; i < cookies.length; i++) {
    const cookieKeyValuePair = cookies[i].split('=');
    if (cookieName == cookieKeyValuePair[0].trim()) {
      return [decodeURIComponent(cookieKeyValuePair[0]), decodeURIComponent(cookieKeyValuePair[1])];
    }
  }
  // Cookie doesn't exist;
  return undefined;
}

export function getCookieValue(cookieName: string) {
  const cookie = getCookie(cookieName);
  if (cookie !== undefined) return cookie[1];
  return undefined;
}

export function setDarkModeCookie(value: boolean) {
  document.cookie = `darkMode=${value}; max-age=604800; SameSite=strict`;
}

export function isDarkModeCookieEnabled(): boolean | undefined {
  const darkModeValue = getCookieValue('darkMode');
  if (darkModeValue == 'true') return true;
  if (darkModeValue == 'false') return false;
  // DarkMode Cookie has not been defined
  return undefined;
}

export function getInitialThemeValue() {
  // By default set the theme to be the user's preferred color scheme when a cookie hasn't been set
  if (window.matchMedia('(prefers-color-scheme: dark)').matches && isDarkModeCookieEnabled() === undefined)
    return 'dark';
  if (isDarkModeCookieEnabled() === true) return 'dark';
  return 'light';
}
