const createError = require("http-errors");
const User = require("../model/user");
const { authSchema, loginSchema } = require("../helper/validationSchema");

const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helper/jwt_helper");

module.exports = {
  register: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);

      const doesExist = await User.findOne({ email: result.username });

      if (doesExist)
        throw createError.Conflict(`${result.username} already exist`);

      const user = new User(result);
      const saveUser = await user.save();

      res.status(200).json({ status: "ok" });
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) err.status = 422;
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await loginSchema.validateAsync(req.body);
      const user = await User.findOne({ username: result.username });

      if (!user) throw createError.NotFound("User not register");

      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch)
        throw createError.Unauthorized("username/password not valid");

      const accessToken = await signAccessToken(user.id);
      const refreshToken = await signRefreshToken(user.id);
      res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: "/",
      });
      const { password, ...others } = user._doc;
      res.send({ accessToken, user: others, expireIn: 1 * 60 * 1000 });
    } catch (err) {
      if (err.isJoi === true) {
        return next(createError.BadRequest("Invalid username/password"));
      }
      next(err);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) throw createError.BadRequest("bad request");

      const userId = await verifyRefreshToken(refreshToken);

      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);
      res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: "/",
      });
      const user = await User.findOne({ _id: userId });
      const { password, ...other } = user._doc;
      res.send({ accessToken, user: other, expireIn: 1 * 60 * 1000 });
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
  logout: async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) throw createError.BadRequest();

      await verifyRefreshToken(refreshToken);
      res.clearCookie("refreshToken");
      res.send({ status: "ok" });
    } catch (err) {
      next(err);
    }
  },
};
