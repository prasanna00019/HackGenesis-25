import mongoose from "mongoose";

// Define the emotion entry schema
const emotionEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Date of the journal entry
  emotion: { type: String, required: true }, // Emotion felt (e.g., happy, sad, angry)
  content: { type: String, required: true }, // Description of the emotions felt
  intensity: { type: Number, min: 1, max: 10, default: 5 }, // Emotion intensity (1-10 scale)
  category: { type: String, default: '' }, // Optional: Category of the emotion (e.g., "Work", "Personal")
});

// Define the EmotionsJournal schema
const EmotionsJournalModel = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  entries: [emotionEntrySchema], // Array of journal entries
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


// Create the EmotionsJournal model
const EmotionJournal = mongoose.model("EmotionsJournal", EmotionsJournalModel);
export default EmotionJournal;
