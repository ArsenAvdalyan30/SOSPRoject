const jsonwebtoken = require("jsonwebtoken");

const userManager = require("../managers/userManager");

const JWT_SECRET = "newToken";

class createJWT {
  async giveTokenForSignUp(userBody) {
    const { firstName, password } = userBody;
    return await res.json({
      token: jsonwebtoken.sign({ user: firstName }, JWT_SECRET),
    });
  }
}

module.exports = new createJWT();
