const { compareSync } = require("bcryptjs");
const { User, Task } = require("../models");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const openAI = require("../helpers/openAI");
const client = new OAuth2Client();

class Controller {
  static async register(req, res, next) {
    try {
      const { fullName, email, password, gender, phoneNumber } = req.body;
      let data = await User.create({
        fullName,
        email,
        password,
        gender,
        phoneNumber,
      });
      let { mailOptions, transporter } = require("../index");
      mailOptions = {
        from: "aetherdstorm@gmail.com",
        to: `${email}`,
        subject: "Welcome to Yaru!Time",
        text: `Welcome to Yaru!Time! Where you can list your tasks, right at the time you want to! Thank you for registering to our website, we're so glad to have you onboard!`,
        attachments: [
          {
            filename: 'logo',
            path: 'https://res.cloudinary.com/dmr6zqq1d/image/upload/v1720678794/YaruTime_Logo_Transparent_umherw.png'
          },
        ],
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.status(201).json({ message: { fullName, email } });
    } catch (error) {
      next(error);
    }
  }
  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "emailRequired" };
      }
      if (!password) {
        throw { name: "passwordRequired" };
      }
      let user = await User.findOne({ where: { email: email } });
      console.log(user);
      if (!user) {
        throw { name: "401" };
      }
      const isPassValid = compareSync(password, user.password);
      if (!isPassValid) {
        throw { name: "401" };
      }
      const token = signToken({
        id: user.id,
      });
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
  static async userLoginGoogle(req, res, next) {
    try {
      console.log(req.body);
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience:
          "375929147115-5ha3641k9dgum5vu3vsegpidsefnm9ml.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        hooks: false,
        defaults: {
          fullName: payload.name,
          email: payload.email,
          password: Math.random().toString(),
          gender: "female",
          phoneNumber: "1234567",
        },
      });
      res.status(200).json({ message: "Login Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getUserById(req, res, next) {
    try {
      const { userId } = req.user;
      let data = await User.findByPk(userId);
      if (!data) {
        throw { name: "404" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { fullName, email, password, gender, phoneNumber } = req.body;
      let userData = await User.findByPk(id);
      if (!userData) {
        throw { name: "404" };
      }
      await User.update(
        {
          fullName,
          email,
          password,
          gender,
          phoneNumber,
        },
        { where: { id: id } }
      );
      res
        .status(200)
        .json({ message: `User ${userData.fullName} successfully updated` });
    } catch (error) {
      next(error);
    }
  }
  static async postTask(req, res, next) {
    try {
      const { userId } = req.user;
      const { title, task } = req.body;
      let data = await Task.create({
        title: title,
        task: task,
        UserId: userId,
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getTasks(req, res, next) {
    try {
      const { userId } = req.user;
      let data = await Task.findAll({ where: { UserId: userId } });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getTaskById(req, res, next) {
    try {
      const { id } = req.params;
      let data = await Task.findByPk(id);
      if (!data) {
        throw { name: "404" };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async updateTask(req, res, next) {
    try {
      const { id } = req.params;
      const { title, task } = req.body;
      let data = await Task.findByPk(id);
      if (!data) {
        throw { name: "404" };
      }
      await Task.update(
        {
          title,
          task,
        },
        { where: { id: id } }
      );
      res
        .status(200)
        .json({ message: `Task ${data.title} successfully updated` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteTask(req, res, next) {
    try {
      const { id } = req.params;
      let data = await Task.findByPk(id);
      if (!data) {
        throw { name: "404" };
      }
      await Task.destroy({ where: { id: id } });
      res
        .status(200)
        .json({ message: `Task ${data.title} successfully deleted` });
    } catch (error) {
      next(error);
    }
  }
  static async getOpenAi(req, res, next) {
    try {
      let responseAI = await openAI(req.body.prompt)
      res.json(responseAI)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = Controller;
