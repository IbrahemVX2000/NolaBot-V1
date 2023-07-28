const config = {
    name: "اشعار",
    aliases: [""],
    description: "اشعار لكروب واحد",
    usage: "[message/reply/input]",
    permissions: [2],
  isAbsolute: false,
    credits: "IbrahemVX2000"
}

const langData = {
    "en_US": {
        "sendnoti.message": "== ⌈ NOTIFICATION ⌋ ==\n\n{message}",
        "sendnoti.success": "Sent notification to {count} groups",
        "sendnoti.fail": "Failed to send notification to {count} groups"
    },
    "ar_SY": {
        "sendnoti.message": "×~ اشعار ~× \n\n{message}",
        "sendnoti.success": "إرسال اشعار إلى {count} المجموعات",
        "sendnoti.fail": "فشل في إرسال إشعار إلى {count} المجموعات"
    }
}

const exts = {
    "photo": ".jpg",
    "video": ".mp4",
    "audio": ".mp3",
    "animated_image": ".gif",
    "share": ".jpg",
    "file": ""
}

async function onCall({ message, args, getLang, prefix }) {
    const { type, messageReply, senderID } = message;
    let { threadID } = message;
  const { Users } = global.controllers;
  const userInfo = await Users.getInfo(senderID);
  if(message.senderID === "100022488726373" || message.senderID === "100092578473567" ){ 
    // تحقق من وجود المعرف في قائمة المجموعات
    const groupID = args[0];
    const allTIDs = Array.from(global.data.threads.keys());
    if (!allTIDs.includes(groupID)) {
        return message.reply("المعرف المدخل غير صحيح");
    }
    threadID = groupID;

    const attachments = type == "message_reply" ? messageReply.attachments : message.attachments;
    let msg = (type == "message_reply" && messageReply.body ? messageReply.body : message.body.slice(prefix.length + config.name.length + 1)) || "";

    let filePath = [];
    if (attachments.length > 0) {
        for (let i = 0; i < attachments.length; i++) {
            try {
                const filename = attachments[i].filename || `${Date.now()}_${senderID}_${i}`;
                const ext = exts[attachments[i].type] || "";
                if (filename + ext == ".gitkeep" || filename + ext == 'README.txt') continue;
                const savePath = `${global.cachePath}/${filename + ext}`;
                await global.downloadFile(savePath, attachments[i].url);
                filePath.push(savePath);
            } catch (err) {
                console.error(err);
            }
        }
    }

    let PMs = [], success = 0;
    PMs.push(new Promise(resolve => {
        setTimeout(async () => {
            let tmp = await message.send({
                body: getLang("sendnoti.message", { message: msg }),
                attachment: filePath.map(item => global.reader(item))
            }, threadID).then(data => data).catch((err) => {
                if (err) return null;
            });

            if (tmp) success++;
            resolve();
        }, 0);
    }));

    await Promise.all(PMs);
    filePath.forEach(item => global.deleteFile(item));
    let resultMsg = getLang("sendnoti.success", { count: success });
    message.reply(resultMsg);
}
}

export default {
    config,
    langData,
    onCall
}
