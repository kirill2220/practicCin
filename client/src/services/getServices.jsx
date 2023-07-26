import $api, { API_URL } from "../https";
export default class getServices {
  static async getFilm() {
    return $api.get("/Home");
  }
  static async GetHistory() {
    return $api.get("/GetHistory");
  }

  static async GetDataFilm(formData) {
    return $api.post("/GetDataFilm", { idFilm: formData });
  }
  static async GetFilmByName(formData) {
    return $api.post("/GetFilmByName", formData);
  }
  static async GetUserIntoSession(idsession) {
    return $api.post("/GetUserIntoSession", { idsession: idsession });
  }
  static async GetFavFilm(idfilm) {
    return $api.post("/GetFavFilm", { idFilm: idfilm });
  }
  static async GetFavoriteFilm() {
    return $api.post("/GetFavoriteFilm");
  }
  static async Dellorder(id) {
    return $api.post("/Dellorder", { id: id });
  }
  static async GetFilmGenre(formData) {
    return $api.post("/GetFilmGenre", { idGenre: formData });
  }
  static async GetTicketUser() {
    return $api.post("/GetTicketUser");
  }
  static async GetGenreFilm() {
    return $api.get("/GetGenreFilm");
  }
  static async GetUsers() {
    return $api.get("/GetUsers");
  }
  static async GetFilmHall() {
    return $api.get("/GetFilmHall");
  }
  static async GetUserById() {
    return $api.get("/GetUserById");
  }
}
