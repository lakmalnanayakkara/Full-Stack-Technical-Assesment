import mongoose from "mongoose";

const emojiStorySchema = new mongoose.Schema({
  emojiSequence: { type: [String], required: true },
  translation: { type: String, required: true },
  authorNickname: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const EmojiStoryModel = mongoose.model("EmojiStoryModel", emojiStorySchema);
export default EmojiStoryModel;
