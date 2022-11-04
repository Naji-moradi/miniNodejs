import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
app.use(cookieParser());

// import routes
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelRout from "./routes/hotel.js";
// const userRoute = require("./routes/user");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotel", hotelRout);
// app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
  connect();
  console.log("Connected to backend.");
});
