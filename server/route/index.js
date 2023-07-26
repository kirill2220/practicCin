const Router = require("express").Router;
const userControl = require("../controllers/userControl");
const router = new Router();
const { body } = require("express-validator");
const authMid = require("../middlewares/authmid");
const cinemaControl = require("../controllers/cinemaControl");

router.post(
  "/registration",
  body("email")
    .isEmail()
    .withMessage("Невалидный email")
    .notEmpty()
    .withMessage("Пустое поле"),
  body("password")
    .matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){6,12}$/gm)
    .withMessage(
      "Пароль должен содержать буквы латинского алфавита в верхем регистре и нижнем регистре и цифры "
    )
    .notEmpty()
    .withMessage("Пустое поле"),
  body("name")
    .matches(/([A-Za-z]){3,9}$/gm)
    .withMessage(
      "Имя может содержать только символы латинского алфавита и от 3 до 9 символов "
    )
    .notEmpty()
    .withMessage("Пустое поле"),
  body("login")
    .notEmpty()
    .withMessage("Пустое поле")
    .matches(/[A-Za-z]{3,9}/)
    .withMessage(
      "Логин может содержать только символы латинского алфавита и быть от 3 до 9 символов"
    )
    .notEmpty()
    .withMessage("Пустое поле"),
  userControl.register
);
router.post("/login", userControl.login);
router.post("/logout", userControl.logout);
router.get("/refresh", userControl.refresh);


router.get("/GetUsers", authMid, userControl.users);
router.get("/home", authMid, cinemaControl.listCinema);
router.get("/GetHistory", authMid, cinemaControl.GetHistory);
router.get("/GetFilmHall", authMid, cinemaControl.GetFilmHall);
router.get("/GetGenreFilm", authMid, cinemaControl.GetGenreFilm);
router.post("/AddFilm", authMid, cinemaControl.addFilms);
router.post("/AddHall", authMid, cinemaControl.AddHall);
router.post("/GetDataFilm", authMid, cinemaControl.listDataCinema);
router.post("/GetFavFilm", authMid, cinemaControl.GetFavFilm);
router.post("/GetFavoriteFilm", authMid, cinemaControl.GetFavoriteFilm);
router.post("/GetFilmGenre", authMid, cinemaControl.GetFilmGenre);
router.post("/GetTicketUser", authMid, cinemaControl.GetTicketUser);
router.post("/AddSession", authMid, cinemaControl.AddSession);
router.post("/ChangeUserInfo", authMid, userControl.ChangeUserInfo);
router.post("/DeleteTicket", authMid, cinemaControl.DeleteTicket);
router.post("/DeleteFilm", authMid, cinemaControl.DeleteFilm);
router.post("/addFavorite", authMid, cinemaControl.addFavorite);
router.post("/removeFavorite", authMid, cinemaControl.removeFavorite);
router.post("/DeleteUser", authMid, userControl.DeleteUser);
router.post("/BuyTicket", authMid, cinemaControl.BuyTicket);
router.post("/GetUserIntoSession", authMid, cinemaControl.GetUserIntoSession);
router.post("/Dellorder", authMid, cinemaControl.Dellorder);
router.post("/GetFilmByName", authMid, cinemaControl.GetFilmByName);
router.get("/GetUserById", authMid, userControl.GetUserById);
module.exports = router;
