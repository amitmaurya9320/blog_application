const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_KEY;
      const options = {
        expiresIn: "1m",
        issuer: "mauryaji.com",
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());

    const token = req.headers["authorization"];
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, payload) => {
      if (err) {
        console.log(err.message);
        const message = err.name === "JsonWebTokenError" ? "" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },

  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_KEY;
      const options = {
        expiresIn: "1w",
        issuer: "mauryaji.com",
        audience: userId,
      };

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
        (err, payload) => {
          if (err) {
            return reject(createError.Unauthorized());
          }
          const userId = payload.aud;
          resolve(userId);
        }
      );
    });
  },
};
