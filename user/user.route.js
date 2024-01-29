import express from "express";
import { validateReqBody } from "../middleware/validation.middleware.js";
import User from "./user.model.js";
import * as bcrypt from "bcrypt";
import { loginUserSchema, registerUserSchema } from "./user.validation.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// register user
router.post(
  "/user/register",
  validateReqBody(registerUserSchema),
  async (req, res) => {
    // extract new user from req.body.
    const newUser = req.body;
    // check user with same email exists.
    const user = await User.findOne({ email: newUser.email });
    // if same user, throw error.
    if (user) {
      return res
        .status(409)
        .send({ message: "User with this email already exists." });
    }
    // hashed password, using bcrypt.
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    // create user.
    await User.create(newUser);
    // send response.
    return res.status(200).send({ message: "success" });
  }
);

// login user
router.post(
  "/user/login",
  validateReqBody(loginUserSchema),
  async (req, res) => {
    // extract login credential from req.body
    const loginCredentials = req.body;
    // find user using email
    const user = await User.findOne({ email: loginCredentials.email });
    // if not user, throw user
    if (!user) {
      return res.status(404).send({ message: "Invalid Credentials." });
    }
    // check for password match
    const isPassword = await bcrypt.compare(
      loginCredentials.password,
      user.password
    );
    // if not password, throw error
    if (!isPassword) {
      return res.status(404).send({ message: "Invalid Credentials" });
    }
    // login is successful and give token
    const token = jwt.sign({ email: user.email }, "mysecretekey");
    // hide password
    user.password = undefined;
    // return response
    return res
      .status(201)
      .send({ message: "success", user: user, token: token });
  }
);
export default router;
