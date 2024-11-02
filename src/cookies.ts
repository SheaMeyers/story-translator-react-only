import { BookTitles, Language } from "./types";

const setCookie = (cookieName: string, cookieValue: string, days: number = 365): void => {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";" + expires + ";path=/";
}

const getCookie = (cname: string): string => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return decodeURIComponent(c.substring(name.length, c.length));
      }
    }
    return "";
}

const selectedBookCookieName = 'selectedBookCookie'
export const setSelectedBookCookie = (value: string): void => setCookie(selectedBookCookieName, value)
export const getSelectedBookCookie = (): BookTitles => getCookie(selectedBookCookieName) as BookTitles

const selectedPageCookieName = 'selectedPageCookie'
export const setSelectedPageCookie = (value: number): void => setCookie(selectedPageCookieName, value.toString())
export const getSelectedPageCookie = (): number => parseInt(getCookie(selectedPageCookieName))

const selectedTextLanguageCookieName = 'selectedTextLanguageCookie'
export const setSelectedTextLanguageCookie = (value: string): void => setCookie(selectedTextLanguageCookieName, value)
export const getSelectedTextLanguageCookie = (): Language => getCookie(selectedTextLanguageCookieName) as Language

const selectedPopupLanguageCookieName = 'selectedPopupLanguageCookie'
export const setSelectedPopupLanguageCookie = (value: string): void => setCookie(selectedPopupLanguageCookieName, value)
export const getSelectedPopupLanguageCookie = (): Language => getCookie(selectedPopupLanguageCookieName) as Language
