import mongoose from "mongoose";

const dbName = "auth-intro";
const userName = "manishpunmagar999";
const userPassword = "manish123";

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${userName}:${userPassword}@cluster0.ilpsipk.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("Database is connected successfully.");
  } catch (error) {
    console.log("Database is not connected.");
    console.log(error.message);
  }
};

export default connectDb;
