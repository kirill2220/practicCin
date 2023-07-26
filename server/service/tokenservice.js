const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
class tokenService {
  async generateTokens(playload) {
    const accessToken = jwt.sign(playload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "20m",
    });
    const refreshToken = jwt.sign(playload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  valdateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
  valdateRefreshToken(token) {
    let userData;
    try {
       userData = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET
      );
      
      return userData;
    } catch (error) {
      return error;
    }
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await conn.token.findFirst({
      where: { idusers: userId },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return conn.token.updateMany({
        where: {
          idusers: userId,
        },
        data: {
          token: refreshToken,
        },
      });
    }
    const token = await conn.token.create({
      data: {
        idusers: userId,
        token: refreshToken,
      },
    });
    return token;
  }

  async removeToken(refreshToken) {

    const tokenData = await conn.token.deleteMany({
      where: {
        token: refreshToken.refreshToken,
      },
    });
    return tokenData;
  }
  async findToken(refreshToken) {
    const tokenData = await conn.token.findFirst({
      where: {
        token: refreshToken.refreshToken,
      },
    });
    return tokenData;
  }
}

module.exports = new tokenService();
