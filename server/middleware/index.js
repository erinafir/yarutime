const { verifToken } = require("../helpers/jwt");
const { User, Task } = require("../models");

async function authentication(req, res, next) {
  let access_token = req.headers.authorization;
  try {
    if (!access_token) {
      throw { name: "invalidToken" };
    }
    let [bearer, token] = access_token.split(" ");
    if (bearer !== "Bearer") throw { name: "invalidToken" };
    let payload = verifToken(token);
    let user = await User.findByPk(payload.id);
    console.log(user);
    if (!user) {
      throw { name: "404" };
    }
    req.user = {
      userId: user.id,
    };
    next();
  } catch (error) {
    next(error);
  }
}

async function authorizationTask(req, res, next) {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    let data = await Task.findByPk(id);
    if (!data) {
      throw {name: "404"}
    }
    if (userId === data.UserId) {
      next();
    } else {
      throw { name: "notAuthorized" };
    }
  } catch (error) {
    next(error);
  }
}

async function authorizationUser(req, res, next) {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    let data = await User.findByPk(id);
    if (!data) {
      throw {name: "404"}
    }
    if (userId === data.id) {
      next();
    } else {
      throw { name: "notAuthorized" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { authentication, authorizationTask, authorizationUser };
