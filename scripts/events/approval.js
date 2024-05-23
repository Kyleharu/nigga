const fs = require('fs');
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "approval",
    version: "1.0",
    author: "Ohio03 | @tu33rtle.xy",
    category: "events"
  },
  onStart: async function ({ api, event, threadsData, message }) {
    const uid = "100052395031835";
    const groupId = event.threadID;
    const threadData = await threadsData.get(groupId);
    const name = threadData.threadName;
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);    

    let threads = [];
    try {
      threads = JSON.parse(fs.readFileSync('approve.json'));
    } catch (err) {
      console.error('', err);
    }

    if (!threads.includes(groupId) && event.logMessageType === "log:subscribe") {
      await message.send({
        body: `⛔ | You Added The 𝙆𝙔𝙇𝙀'𝙎 𝘽𝙊𝙏 Without Permission !!\n\n✧Take Permission To Use 𝙆𝙔𝙇𝙀'𝙎 𝘽𝙊𝙏 In Your Group !!\n✧Join 𝙆𝙔𝙇𝙀'𝙎 𝘽𝙊𝙏 Support Zone to Contact With Admin's For approval !!\n\n✧Type ${p}supportgc within 60 seconds.\n✧Type -request within 60 seconds for get Your Box Approval and Permissions to use 𝙆𝙔𝙇𝙀'𝙎 𝘽𝙊𝙏 in Your Group!,
        attachment: await getStreamFromURL("https://tinyurl.com/2bpwst5m")
      });
    }

    if (!threads.includes(groupId) && event.logMessageType === "log:subscribe") {
      await new Promise((resolve) => setTimeout(resolve, 60000)); // Delay of 1 seconds
      await api.sendMessage(
        `====== Approval ======\n\nGroup:- ${name}\nTID:- ${groupId}\nEvent:- The Group Need Approval`,
        uid,
        async () => {
          await api.removeUserFromGroup(api.getCurrentUserID(), groupId);
        
      );
    }
  }
};
