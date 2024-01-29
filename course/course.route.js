import express from "express";
import { isUser } from "../middleware/authentication.middleware.js";
import { validateReqBody } from "../middleware/validation.middleware.js";
import { Course } from "./course.model.js";
import { addCourseSchema } from "./course.validation.js";

const router = express.Router();

// ADD course
router.post(
  "/course/add",
  isUser,
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
