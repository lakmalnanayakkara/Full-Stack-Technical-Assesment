import mongoose from "mongoose";

const translationRuleSchema = new mongoose.Schema({
  pattern: { type: [String], required: true },
  templates: { type: [String], required: true },
});

const TranslationRuleModel = mongoose.model(
  "TranslationRuleModel",
  translationRuleSchema
);
export default TranslationRuleModel;
