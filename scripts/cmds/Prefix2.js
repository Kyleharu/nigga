module.exports = {
    config: {
        name: "prefix2",
        version: "1.0",
        author: "Kylepogi",
        countDown: 5,
        role: 0,
        shortDescription: "ignore this command",
        longDescription: "so beautiful so elegant just looking like a WoW💩",
        category: "no prefix",
    },
    onStart: async function () {},
    onChat: async function ({ event, message, getLang, api }) {
        const trigger = 'prefix2';

        if (event.body && event.body.toLowerCase() === trigger) {
            return message.reply(`mewww, maoww!😺\n\n🌐 System prefix: ×\n🛸 Your box chat prefix: ×`);
        }
    }
};
