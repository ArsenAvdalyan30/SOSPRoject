const userManager = require("../managers/userManager.js");
const bcrypt = require("bcrypt");
const util = require("util");

bcrypt.hash = util.promisify(bcrypt.hash);

class userController {
  async getUsers(req, res) {
    const users = await userManager.getUsers();
    res.send(users);
    res.end();
  }

  async signUp(req, res) {
    const user = req.body;
    if ((await userManager.checkExistByUserName(user.userName)).length !== 0) {
      res.status(400).send("User with such userName already exists");
    } else if ((await userManager.checkExistByEmail(user.email)).length !== 0) {
      res.status(400).send("User with such email already exists");
    } else if (user.password.length <= 8) {
      res.status(400).send("password must be more than 8 symbols!");
    } else {
      user.password = await bcrypt.hash(user.password, 10);
      await userManager.signUp(user);
      res.status(200).send("Register successful!");
    }
  }

  async login(req, res) {
    const user = req.body.userName;
    const password = req.body.password;

    const sqlSearch = await userManager.checkExistByUserName(user);
    console.log(2, sqlSearch);

    if (sqlSearch.length === 0) {
      console.log("-----> User does not exist");
      res.status(404).end();
    } else {
      const hashedPassword = sqlSearch[0].password;
      console.log(hashedPassword);
      if (await bcrypt.compare(password, hashedPassword)) {
        console.log("-----> Login Successful");
        res.send(`${user} is logged in!`);
      } else {
        console.log("----> Password Incorrect");
        res.send("Password Incorrect!");
      }
    }
  }
}

module.exports = new userController();
