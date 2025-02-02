import User from "../models/UserModel.js";
export const streakActivity=async(req,res)=>{
    try {
        // Assume the user is authenticated and their id is available as req.user._id
        const {userId}=req.params;
        // The frontend should send the practice details in the request body
        const { practiceName, duration } = req.body; // duration in seconds
        // Get current timestamp
        const now = new Date(Date.now() + 2*24 * 60 * 60 * 1000);
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        if (user.lastPracticeDate) {
            const lastDate = new Date(user.lastPracticeDate);
            const currentDate = new Date(now);
      
            // Normalize both dates to midnight for an accurate day difference
            lastDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);
      
            const diffInDays = Math.floor((currentDate - lastDate) / (24 * 60 * 60 * 1000));
            console.log(diffInDays);
            if (diffInDays === 1) {
              // Practice done exactly on the next day – increment streak.
              user.streak = (user.streak || 0) + 1;
            } else if (diffInDays === 0) {
              // Practice already done today; do not change streak.
              // Optionally, you could return an error or ignore this attempt.
            } else {
              // More than one day difference – reset the streak.
              user.streak = 1;
            }
          } else {
            // No previous practice, so initialize streak.
            user.streak = 1;
          }
      
          // Update the last practice date to now
          user.lastPracticeDate = now;
      
          // Add a new practice record
          user.practiceRecords.push({
            practiceName,
            practicedAt: now,
            duration
          });
      
        await user.save();
        res.status(200).json({
          message: "Practice completed successfully",
          streak: user.streak,
          lastPracticeDate: user.lastPracticeDate,
          practiceRecords: user.practiceRecords
        });
      } catch (err) {
        console.error("Error completing practice:", err);
        res.status(500).json({ message: "Internal server error" });
      }
}