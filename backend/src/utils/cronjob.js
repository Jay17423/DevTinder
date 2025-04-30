const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

cron.schedule("0 8 * * *", async () => { 
  try {
    const yesterday = subDays(new Date(), 0);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    // Fetch pending requests from yesterday
    const pendingRequests = await ConnectionRequestModel.find({
      status: "intrested",
      createdAt: {
        $gte: yesterdayStart,
        $lte: yesterdayEnd,
      },
    }).populate("toUserId"); 
    
    // Extract unique emails
    const listOfEmails = [
      ...new Set(pendingRequests.map((request) => request.toUserId.email)),
    ];

    // Send emails to all users
    for (const email of listOfEmails) {
      try {
        await sendEmail.run(
          email,
          "New Friend Request Pending",
          "You have pending friend requests. Please check your dashboard."
        );
  
      } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
      }
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
