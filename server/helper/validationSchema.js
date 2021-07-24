const joi = require("@hapi/joi");

const authSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(6).required(),
  email: joi.string().email().lowercase().required(),
  profilePic: joi.string(),
});

const loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(6).required(),
});

const postSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  photo: joi.string(),
  username: joi.string().required(),
  category: joi.array(),
});

const catSchema = joi.object({
  name: joi.string().required().lowercase(),
});
module.exports = {
  authSchema,
  postSchema,
  catSchema,
  loginSchema,
};
