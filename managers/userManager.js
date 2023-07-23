const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
  password: "mynewpassword00",
  user: "root",
  database: "new_schema",
  host: "localhost",
});

pool.query = util.promisify(pool.query);

class userManager {
  async getUsers() {
    const users = pool.query("SELECT * FROM customers");
    return users;
  }

  async signUp(user) {
    const insertUser = pool.query(
      `INSERT INTO customers (userName, password, firstName, lastName, email) VALUES ('${user.userName}', '${user.password}', '${user.firstName}', '${user.lastName}', '${user.email}')`
    );
    return insertUser;
  }

  async checkExistByUserName(userName) {
    const foundUser = pool.query(
      mysql.format("Select * from customers where userName = ?", [userName])
    );
    return foundUser
  }

  async checkExistByEmail(email) {
    const foundUser = pool.query(
      mysql.format("Select * from customers where email = ?", [email])
    );
    return foundUser
  }
}

module.exports = new userManager();
