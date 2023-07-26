import $api, { API_URL } from "../https";
export default class AuthService {
  static async login(login, password) {
    return $api.post("/login", { login, password });
  }
  static async logout() {
    return $api.post("/logout");
  }
  static async checkAuth() {
    return $api.get(`${API_URL}/refresh`);
  }
}
