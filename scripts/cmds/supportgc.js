module.exports = {
  config: {
    name: "supportgc",
    version: "2.0",
    author: "SiAM",
    countDown: 30,
    role: 0,
    shortDescription: {
      en: "Join the Syntax Team Support"
    },
    longDescription: {
      en: "🌟 Elevate your experience! Use this command to join the elite Syntax Team Support group and unlock exclusive benefits and assistance from our dedicated team. 👥"
    },
    category: "support",
    guide: {
      en: "📚 To access premium support, simply type -joinSupport."
    }
  },

  onStart: async function ({ api, args, message, event }) {
    const supportGroupId = "6934711683285483"; // ID of the support group

    const threadID = event.threadID;
    const userID = event.senderID;

    try {
      const threadInfo = await api.getThreadInfo(supportGroupId);
      const participantIDs = threadInfo.participantIDs;

      if (participantIDs.includes(userID)) {
        api.sendMessage(
          "👤 You're already part of the 𝙆𝙔𝙇𝙀'𝙎 𝙂𝙍𝙊𝙐𝙋 ➤ [ Support Box ] If you can't find it, check your message requests or spam box.",
          threadID
        );
      } else {
        api.addUserToGroup(userID, supportGroupId, (err) => {
          if (err) {
            console.error("Failed to add user to support group:", err);
            api.sendMessage(
              "❌ Oops! Something went wrong. Make sure your account allows messaging or try adding me and use -supportgc again.",
              threadID
            );
          } else {
            api.sendMessage(
              "🚀 Welcome to 𝙆𝙔𝙇𝙀'𝙎 𝙂𝙍𝙊𝙐𝙋 [ Support Zone ] You now have access to enjoy in CaT Ara Support Zone. Check your inbox for details.",
              threadID
            );
            // Additional welcome message or actions can be added here
          }
        });
      }
    } catch (e) {
      console.error("Failed to get thread info:", e);
      api.sendMessage(
        "❌ Unable to retrieve support group information at the moment. Please try again later.",
        threadID
      );
    }
  }
};
