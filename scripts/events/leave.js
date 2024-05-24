const { getTime, drive } = global.utils;

module.exports = {
	config: {
		name: "leave",
		version: "1.4",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			leaveType1: "tự rời",
			leaveType2: "bị kick",
			defaultLeaveMessage: "{userName} đã {type} khỏi nhóm"
		},
		en: {
			session1: "𝗺𝗼𝗿𝗻𝗶𝗻𝗴",
			session2: "𝗻𝗼𝗼𝗻",
			session3: "𝗮𝗳𝘁𝗲𝗿𝗻𝗼𝗼𝗻",
			session4: "𝗲𝘃𝗲𝗻𝗶𝗻𝗴",
			leaveType1: "𝗹𝗲𝗳𝘁",
			leaveType2: "𝘄𝗮𝘀 𝗸𝗶𝗰𝗸𝗲𝗱 𝗳𝗿𝗼𝗺",
			defaultLeaveMessage: "𝗚𝗼𝗼𝗱 𝗕𝘆𝗲 𝗻𝗶𝗴𝗴𝗮 『{userNameTag}』\n┏━━━━━━━━━━━━━━┓\n  ╭┈ 𝗥𝗲𝗮𝘀𝗼𝗻📌\n  ╰┈➤ {type} 𝘁𝗼 𝘁𝗵𝗲 𝗴𝗿𝗼𝘂𝗽.\n┗━━━━━━━━━━━━━━┛\n𝘎𝘰𝘰𝘥 𝘣𝘺𝘦 𝘐 𝘥𝘰𝘯'𝘵 𝘤𝘢𝘳𝘦 𝘪𝘧 𝘺𝘰𝘶 𝘭𝘦𝘢𝘷𝘦 𝘵𝘩𝘪𝘴 𝘨𝘳𝘰𝘶𝘱 𝘐𝘥𝘪 𝘸𝘩𝘰 𝘵𝘧 𝘺𝘰𝘶 𝘢𝘳𝘦 𝘯𝘪𝘨𝘨𝘢 𝘴𝘩𝘪𝘵𝘵🙄"
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
		if (event.logMessageType == "log:unsubscribe")
			return async function () {
				const { threadID } = event;
				const threadData = await threadsData.get(threadID);
				if (!threadData.settings.sendLeaveMessage)
					return;
				const { leftParticipantFbId } = event.logMessageData;
				if (leftParticipantFbId == api.getCurrentUserID())
					return;
				const hours = getTime("HH");

				const threadName = threadData.threadName;
				const userName = await usersData.getName(leftParticipantFbId);

				// {userName}   : name of the user who left the group
				// {type}       : type of the message (leave)
				// {boxName}    : name of the box
				// {threadName} : name of the box
				// {time}       : time
				// {session}    : session

				let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data;
				const form = {
					mentions: leaveMessage.match(/\{userNameTag\}/g) ? [{
						tag: userName,
						id: leftParticipantFbId
					}] : null
				};

				leaveMessage = leaveMessage
					.replace(/\{userName\}|\{userNameTag\}/g, userName)
					.replace(/\{type\}/g, leftParticipantFbId == event.author ? getLang("leaveType1") : getLang("leaveType2"))
					.replace(/\{threadName\}|\{boxName\}/g, threadName)
					.replace(/\{time\}/g, hours)
					.replace(/\{session\}/g, hours <= 10 ?
						getLang("session1") :
						hours <= 12 ?
							getLang("session2") :
							hours <= 18 ?
								getLang("session3") :
								getLang("session4")
					);

				form.body = leaveMessage;

				if (leaveMessage.includes("{userNameTag}")) {
					form.mentions = [{
						id: leftParticipantFbId,
						tag: userName
					}];
				}

				if (threadData.data.leaveAttachment) {
					const files = threadData.data.leaveAttachment;
					const attachments = files.reduce((acc, file) => {
						acc.push(drive.getFile(file, "stream"));
						return acc;
					}, []);
					form.attachment = (await Promise.allSettled(attachments))
						.filter(({ status }) => status == "fulfilled")
						.map(({ value }) => value);
				}
				message.send(form);
			};
	}
};
