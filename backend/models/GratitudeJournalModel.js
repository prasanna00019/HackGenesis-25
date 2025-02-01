import mongoose from "mongoose";
// Define the journal entry schema
const journalEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  content: { type: String, required: true },
});
// Define the GratitudeJournal schema
const GratitudeJournalModel = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  entries: [journalEntrySchema], // Array of journal entries
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
// Create the GratitudeJournal model
const GratitudeJournal = mongoose.model("GratitudeJournal", GratitudeJournalModel);
export default GratitudeJournal;
