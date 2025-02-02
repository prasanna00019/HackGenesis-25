import EmotionJournal from "../models/EmotionsJournalModel.js";
import GratitudeJournal from "../models/GratitudeJournalModel.js";
import redisClient from "../utils/RedisClient.js";
export const AddGratitudeEntry = async (req, res) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ message: "UserId and content are required." });
    }
    let journal;
     let redisKey=`gratitudeJournal:${userId}`;
      // Fetch from MongoDB if not in cache
      journal = await GratitudeJournal.findOne({ userId });
      if (!journal) {
        // Create a new journal if none exists
        journal = new GratitudeJournal({
          userId,
          entries: [{ date: new Date(), content }],
        });
      } else {
        // Append the new entry
        journal.entries.push({ date: new Date(), content });
        journal.updatedAt = new Date();
      }
      // Save to DB and cache in Redis
      await journal.save();
      await redisClient.set(redisKey, JSON.stringify(journal), { EX: 3600 }); // Cache for 1 hour
    return res.status(200).json({
      message: "Gratitude entry added successfully",
      journal,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
export const getAllGratitudeEntries = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const redisKey = `gratitudeJournal:${userId}`;
    // Attempt to fetch from Redis cache
    let journal = await redisClient.get(redisKey);
    if (journal) {
      journal = JSON.parse(journal);
      return res.status(200).json({
        success: true,
        message: "Gratitude journal fetched from cache",
        data: journal,
      });
    }
    // Fetch from MongoDB if not in Redis
    journal = await GratitudeJournal.findOne({ userId }).lean(); // lean() to return plain JS object
    if (!journal) {
      return res.status(404).json({ success: false, message: "Journal not found" });
    }
    // Store in Redis and set expiration
    await redisClient.set(redisKey, JSON.stringify(journal), { EX: 3600 });
    return res.status(200).json({
      success: true,
      message: "Gratitude journal fetched successfully",
      data: journal,
    });
  } catch (err) {
    console.error('Error fetching journal:', err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
export const UpdateGratitudeEntryById = async (req, res) => {
  try {
    const { userId, entryId } = req.params;
    const { content } = req.body; // New content for the entry
    console.log(userId, entryId, content);
    // Check if userId and entryId are provided
    if (!userId || !entryId) {
      return res.status(400).json({ message: "UserId and entryId are required." });
    }

    // Validate content
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content cannot be empty." });
    }

    // Update the entry in the database
    const updatedEntry = await GratitudeJournal.findOneAndUpdate(
      { "entries._id": entryId, userId: userId },
      { content },
      { new: true }
    );

    // If entry not found
    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found." });
    }

    // Invalidate the Redis cache for the user's gratitude journal
    const redisKey = `gratitude:${userId}`;
    await redisClient.del(redisKey);

    // Respond with the updated entry
    return res.status(200).json({ message: "Entry updated successfully.", entry: updatedEntry });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while updating the entry." });
  }
};
export const DeleteGratitudeEntryById = async (req, res) => {
  try {
    const { userId, entryId } = req.params;
    console.log(userId, entryId);
    // Validate input
    if (!userId || !entryId) {
      return res.status(400).json({ message: "UserId and entryId are required." });
    }
    // Delete the entry from the database
    const deletedEntry = await GratitudeJournal.findOneAndDelete({ "entries._id": entryId, userId: userId });
    // If entry not found
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found." });
    }
    // Invalidate the Redis cache for the user's gratitude journal
    const redisKey = `gratitude:${userId}`;
    await redisClient.del(redisKey);
    // Respond with a success message
    return res.status(200).json({ message: "Entry deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while deleting the entry." });
  }
};
export const AddEmotionEntry = async (req, res) => {
  try {
    const { userId } = req.params;
    const { content, intensity, emotion } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ message: "UserId and content are required." });
    }
    let journal;
     let redisKey=`EmotionalJournal:${userId}`;
      // Fetch from MongoDB if not in cache
      journal = await EmotionJournal.findOne({ userId });
      if (!journal) {
        // Create a new journal if none exists
        journal = new EmotionJournal({
          userId,
          entries: [{ date: new Date(), content , intensity,emotion}],
        });
      } else {
        // Append the new entry
        journal.entries.push({ date: new Date(), content, intensity,emotion });
        journal.updatedAt = new Date();
      }
      // Save to DB and cache in Redis
      await journal.save();
      await redisClient.set(redisKey, JSON.stringify(journal), { EX: 3600 }); // Cache for 1 hour
    return res.status(200).json({
      message: "emotional journal entry added successfully",
      journal,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
export const getAllEmotionEntries = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const redisKey = `EmotionalJournal:${userId}`;
    // Attempt to fetch from Redis cache
    let journal = await redisClient.get(redisKey);
    if (journal) {
      journal = JSON.parse(journal);
      return res.status(200).json({
        success: true,
        message: "Gratitude journal fetched from cache",
        data: journal,
      });
    }
    // Fetch from MongoDB if not in Redis
    journal = await EmotionJournal.findOne({ userId }).lean(); // lean() to return plain JS object
    if (!journal) {
      return res.status(404).json({ success: false, message: "Journal not found" });
    }
    // Store in Redis and set expiration
    await redisClient.set(redisKey, JSON.stringify(journal), { EX: 3600 });
    return res.status(200).json({
      success: true,
      message: "emotional journal fetched successfully",
      data: journal,
    });
  } catch (err) {
    console.error('Error fetching journal:', err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}
export const UpdateEmotionEntryById = async (req, res) => {
  try {
    const { userId, entryId } = req.params;
    const { content,emotion,intensity } = req.body; // New content for the entry
    // Check if userId and entryId are provided
    if (!userId || !entryId) {
      return res.status(400).json({ message: "UserId and entryId are required." });
    }
    // Validate content
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content cannot be empty." });
    }

    // Update the entry in the database
    const updatedEntry = await GratitudeJournal.findOneAndUpdate(
      { "entries._id": entryId,emotion:emotion,intensity:intensity, userId: userId },
      { content },
      { new: true }
    );

    // If entry not found
    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found." });
    }

    // Invalidate the Redis cache for the user's gratitude journal
    const redisKey = `Emotional:${userId}`;
    await redisClient.del(redisKey);

    // Respond with the updated entry
    return res.status(200).json({ message: "Entry updated successfully.", entry: updatedEntry });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while updating the entry." });
  }
}
export const DeleteEmotionEntryById = async (req, res) => {
  try {
    const { userId, entryId } = req.params;
    console.log(userId, entryId);
    // Validate input
    if (!userId || !entryId) {
      return res.status(400).json({ message: "UserId and entryId are required." });
    }
    // Delete the entry from the database
    const deletedEntry = await EmotionJournal.findOneAndDelete({ "entries._id": entryId, userId: userId });
    // If entry not found
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found." });
    }
    // Invalidate the Redis cache for the user's gratitude journal
    const redisKey = `Emotional:${userId}`;
    await redisClient.del(redisKey);
    // Respond with a success message
    return res.status(200).json({ message: "Entry deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while deleting the entry." });
  }
}
