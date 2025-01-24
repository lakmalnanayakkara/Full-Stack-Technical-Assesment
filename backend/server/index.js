import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import StoryRouter from "./routes/EmojiStoryRouter.js";
import cors from "cors";

dotenv.config({
  path: "./server/.env",
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/stories", StoryRouter);

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`Server at http://localhost:50000`);
});
