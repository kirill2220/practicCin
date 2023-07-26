const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
const bcrypt = require("bcrypt");
const tokenService = require("../service/tokenservice");
const ApiError = require("../exception/apierror");
const UserDto = require("../dto/user-dto");

class userService {
  async registration(login, password, email, name) {
    const candidateLogin = await conn.users.findFirst({
      where: { login: login },
    });
    const candidateEmail = await conn.users.findFirst({
      where: { email: email },
    });
    if (candidateLogin) {
      throw ApiError.BadReq(
        `Ползователь с таким логином ${login} существует `,
        "login"
      );
    }
    if (candidateEmail) {
      throw ApiError.BadReq(
        `Ползователь с таким email ${email} существует `,
        "email"
      );
    }

    const salt = bcrypt.genSaltSync(3);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await conn.users.create({
      data: {
        login: login,
        password: hashPassword,
        name: name,
        email: email,
      },
    });
    const id = await conn.users.findFirst({
      where: { login: login },
    });

    const userDto = new UserDto(id);
    const tokens = await tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(userDto.id, (await tokens).refreshToken);

    return { ...tokens, userDto };
  }

  async login(login, password) {
    const user = await conn.users.findFirst({
      where: {
        login: login,
      },
    });
    if (!user) {
      throw ApiError.BadReq(`Неверный логин или пароль `);
    }
    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue) {
      throw ApiError.BadReq(`Неверный логин или пароль `);
    }

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(userDto.id, (await tokens).refreshToken);

    return { ...tokens, userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnAuthError();
    }

    const userData = await tokenService.valdateRefreshToken(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (!("id" in userData) || !("id" in dbToken)) {
      throw ApiError.UnAuthError();
    }

    const id = await conn.users.findFirst({
      where: { id: userData.id },
    });
    const userDto = new UserDto(id);

    const tokens = await tokenService.generateTokens({ ...userDto });
    tokenService.saveToken(userDto.id, (await tokens).refreshToken);

    return { ...tokens, userDto };
  }
  async getAllUsers(id) {
    const users = await conn.users.findMany({
      where: {
        id: {
          not: id,
        },
      },
    });
    return users;
  }
  async loginCheck(login) {
    const users = await conn.users.findFirst({
      where: { login: login },
    });
    return users;
  }
  async GetUserById(id) {
    const users = await conn.users.findFirst({
      where: { id: id },
    });
    return users;
  }
  async DeleteUser(idUser) {
    const user = await conn.users.delete({
      where: {
        id: parseInt(idUser),
      },
    });
    const users = await conn.users.findMany({});
    return users;
  }
  async ChangeUserInfo(login, name, email, id) {
    const updatedUser = await conn.users.update({
      where: {
        id: parseInt(id),
      },
      data: {
        login: login,
        name: name,
        email: email,
      },
    });
    return updatedUser;
  }
  async checkExistence(...args) {
    let errors = [];
    for (let arg of args) {
      if (!arg[0]) {
        errors.push(arg[1]);
      }
    }
    return errors;
  }
}

module.exports = new userService();
