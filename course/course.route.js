import express from "express";
import { addCourseSchema } from "./course.validation.js";
import { Course } from "./course.model.js";
import { validateReqBody } from "../middleware/validation.middleware.js";
import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

const router = express.Router();

// ADD course
router.post(
  "/course/add",
  async (req, res, next) => {
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
  },
  validateReqBody(addCourseSchema),
  async (req, res) => {
    // extract course from req.body
    const courseData = req.body;
    // add course
    await Course.create(courseData);

    // send response
    return res.status(201).send({ message: "Course is added successfully" });
  }
);
export default router;
