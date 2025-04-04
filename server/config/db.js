import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected to the mongodb");
    })
    .catch((error) => console.log(error));
};

export default connectDB;
