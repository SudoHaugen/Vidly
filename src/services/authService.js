/**@format */

import httpService from "../services/httpService";
import { authAPI } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await httpService.post(authAPI, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
};
