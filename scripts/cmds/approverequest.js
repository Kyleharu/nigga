const fs = require('fs');

module.exports = {
  config: {
    name: "approverequest",
    aliases: ["request"],
    version: "1.0",
    role: "0",
    author: "NZ R",
    cooldown: "5",
    longDescription: {
      en: "",
    },
    category: "Developer",
    guide: {
      en: ""
    }
  },
  onStart: async function ({ api, event, threadsData, message, args }) {
    
    const constNehaltheGoat = 'approve.json';
    const constNehallovesMeta = '6934711683285483';

    const constMetalovesNehal = event.threadID; // NZ R metadata
    const threadData = await threadsData.get(constMetalovesNehal);
    const name = threadData.threadName;

    let constNehal = [];
    try {
      constNehal = JSON.parse(fs.readFileSync(constNehaltheGoat));
    } catch (err) {
      console.error('', err);
    }

    if (!constNehal.find(thread => thread.groupId === constMetalovesNehal)) {
      constNehal.push({ groupId: constMetalovesNehal, name });
      fs.writeFileSync(constNehaltheGoat, JSON.stringify(constNehal));
      api.sendMessage(`Group: ${name}\nTID: ${constMetalovesNehal}\nRequested for approval!`, constNehallovesMeta);
      message.reply("Your request has been sent for approval.");
    } else {
      message.reply("This group has already been requested for approval.");
    }
  }
};
