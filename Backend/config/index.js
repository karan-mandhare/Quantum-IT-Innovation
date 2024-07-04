import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://localhost:27017/Quantums"
    );
    if (connect) {
      console.log(
        `Database connected successfully with ${connect?.connection?.name}`
      );
    }
  } catch (err) {
    console.log("error while datatabase connection", err);
  }
};

export default connectDB;
