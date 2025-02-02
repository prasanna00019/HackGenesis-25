import mongoose from "mongoose";
const practiceRecordSchema = new mongoose.Schema({
  practiceName: { type: String, required: true },
  practicedAt: { type: Date, default: Date.now },
  duration: { type: Number, required: true } // duration in seconds
});
const UserSchema = new mongoose.Schema({
   username: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true }, 
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
   lastPracticeDate: { type: Date, default: null },
   streak: { type: Number, default: 0 },
   practiceRecords: [practiceRecordSchema]
  });
const User = mongoose.model("User", UserSchema);
export default User