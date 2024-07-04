import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/index.js";
import userRoute from "./routers/user.routes.js";
import employeeRoute from "./routers/employee.routes.js";

connectDB();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/employee", employeeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
