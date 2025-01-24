import express from "express";
import {
  createStory,
  getStories,
  savePatterns,
} from "../controllers/EmojiStoryController.js";

const StoryRouter = express.Router();

StoryRouter.get("/save-patterns", savePatterns);
StoryRouter.post("/create-story", createStory);
StoryRouter.get("/all-stories", getStories);

export default StoryRouter;
