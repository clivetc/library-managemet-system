import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setLocalStorage = (key: string, value: string) => {
  cookies.set(key, value);
};

export const getLocalStorage = (key: string) => {
  return cookies.get(key);
};

export const clearLocalStorage = (key: string) => {
  cookies.remove(key);
};
