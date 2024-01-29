import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const isUser = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");
  const token = splittedValues?.length == 2 ? splittedValues[1] : undefined;

  // if not token
  if (!token) {
    return res.status(401).send({ message: "Unauthorize" });
  }

  // verify token
  let payload;
  try {
    payload = jwt.verify(token, "mysecretekey");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorize" });
  }

  // find user using email from payload
  const user = await User.findOne({ email: payload.email });

  // if not user, throw error
  if (!user) {
    return res.status(401).send({ message: "Unauthorize" });
  }
  // call next function
  next();
};
