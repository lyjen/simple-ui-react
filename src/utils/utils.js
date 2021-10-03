import { sha256 } from "js-sha256";
import { parse } from 'querystring';
export const encryptText = (text) => {
    return sha256(text + "1080PFULLHD20188");
};

export function getUserData() {
    console.log(localStorage.getItem('dummyApp-user'));
    return localStorage.getItem('dummyApp-user');
  }

export const getPageQuery = () => parse(window.location.href.split('?')[1]);