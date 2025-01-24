import data from "../data.js";
import EmojiStoryModel from "../models/EmojiStoryModel.js";
import TranslationRuleModel from "../models/TranslationRuleModel.js";

const translateEmojis = async (emojiSequence) => {
  const rules = await TranslationRuleModel.find();
  let translationParts = [];
  let i = 0;
  while (i < emojiSequence.length) {
    let foundMatch = false;
    for (let len = emojiSequence.length - 1; len > 0; len--) {
      const subsequence = emojiSequence.slice(i, i + len);
      const matchedRule = rules.find(
        (rule) => JSON.stringify(rule.pattern) === JSON.stringify(subsequence)
      );

      if (matchedRule) {
        const randomTemplate =
          matchedRule.templates[
            Math.floor(Math.random() * matchedRule.templates.length)
          ];
        translationParts.push(randomTemplate);
        i += len;
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) {
      translationParts.push(`[Untranslated:${emojiSequence[i]}]`);
      i++;
    }
  }
  return translationParts.join(" ");
};

export const createStory = async (req, res) => {
  const { emojiSequence, authorNickname } = req.body;
  const translation = translateEmojis(emojiSequence);
  const newStory = new EmojiStoryModel({
    emojiSequence,
    translation,
    authorNickname,
  });

  try {
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStories = async (req, res) => {
  try {
    const stories = await EmojiStoryModel.find();
    stories
      ? res.status(201).json(stories)
      : res.status(404).json({ message: "Stories not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const savePatterns = async (req, res) => {
  try {
    const patterns = await TranslationRuleModel.insertMany(data.patterns);
    res.status(201).json(patterns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { createStory, getStories, savePatterns };
