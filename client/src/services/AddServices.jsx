import $api, { API_URL } from "../https";
export default class AddServices {
  static async AddFilm(formData) {
    return $api.post("/AddFilm", formData);
  }
  static async BuyTicket(tickets, sessions) {
    return $api.post("/BuyTicket", {tickets:tickets, sessions:sessions});
  }
  static async AddHall(formData) {
    return $api.post("/AddHall", formData);
  }
  static async AddSessions(formData) {
    return $api.post("/AddSession", formData);
  }
  static async addFavorite(idfilm, id) {
    return $api.post("/addFavorite", { idfilm: idfilm });
  }
  static async removeFavorite(idfilm, id) {
    return $api.post("/removeFavorite", { idfilm: idfilm });
  }
  static async DeleteTicket(idTicket) {
    return $api.post("/DeleteTicket", { idTicket: idTicket });
  }
  static async DeleteFilm(idFilm) {
    return $api.post("/DeleteFilm", { idFilm: idFilm });
  }
  static async DeleteUser(idUser) {
    return $api.post("/DeleteUser", { idUser: idUser });
  }
  static async ChangeUserInfo(formData) {
    return $api.post("/ChangeUserInfo", formData);
  }
}
