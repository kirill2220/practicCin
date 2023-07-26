const userService = require("../service/userservice");
const { validationResult } = require("express-validator");
const ApiError = require("../exception/apierror");
class userControl {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadReq("Ошибка валидации", errors.array()));
      }
      const { login, password, email, name } = req.body;
      const userData = await userService.registration(
        login,
        password,
        email,
        name
      );

      //res.cookie('refreshToken',userData,{maxAge:30*24*60*60*1000,httpOnly:true})
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { login, password } = req.body;
      let errors = await userService.checkExistence(
        [login, "login"],
        [password, "password"]
      );

      if (!errors.length == 0) {
        throw ApiError.EmptyReq(`Введите пожалуйста логин и пароль `, errors);
      }

      const userData = await userService.login(login, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async users(req, res, next) {
    try {
      const users = await userService.getAllUsers(req.user.id);
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
  async ChangeUserInfo(req, res, next) {
    try {
      const { login, name, email, id } = req.body;
      const nameRegex = /^[a-zA-Z0-9]{3,12}$/;
      let errors = await userService.checkExistence(
        [login, "login"],
        [name, "name"],
        [email, "email"]
      );

      if (!errors.length == 0) {
        throw ApiError.EmptyReq(`Заполните пожалуйста все поля `, errors);
      }
      if (!nameRegex.test(login)) {
        throw ApiError.BadReq(
          "Логин может содержать только символы латинского алфавита и от 3 до 12 символов ",
          ["login"]
        );
      }
      if (!nameRegex.test(name)) {
        throw ApiError.BadReq(
          "Имя может содержать только символы латинского алфавита и от 3 до 12 символов ",
          ["name"]
        );
      }

      if (login != req.user.login) {
        const loginCheck = await userService.loginCheck(login);
        if (loginCheck) {
          throw ApiError.BadReq("Пользователь с таким логином уже существует", [
            "login",
          ]);
        }
      }
      const token = await userService.ChangeUserInfo(
        login,
        name,
        email,
        req.user.id
      );
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async DeleteUser(req, res, next) {
    try {
      const { idUser } = req.body;
      const user = await userService.DeleteUser(idUser);

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async GetUserById(req, res, next) {
    try {

      const user = await userService.GetUserById(req.user.id);

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new userControl();
