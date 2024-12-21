import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: any): void => {
    return cookies.set(name, value);
};

export const getCookie = (name: string): any => {
    return cookies.get(name);
};

export const removeCookie = (name: string): void => {
    return cookies.remove(name);
};