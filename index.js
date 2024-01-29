import express from "express";
import connectDb from "./connect.db.js";
import userRouter from "./user/user.route.js";
import courseRouter from "./course/course.route.js";

const app = express();
// to make app understand json
app.use(express.json());

// connect database
connectDb();

// register routes
app.use(userRouter);
app.use(courseRouter);
// network port and server
const port = 4500;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
