const config = {
    name: "ادمنز",
    aliases: ["مشرف","ادمن"],
    version: "1.0.1",
    description: "اعدادات مشرفين البوت",
    permissions: [2],
    isAbsolute: false,
    cooldown: 5
}

const langData = {
    "en_US": {
        "notAbsolute": "You are not an absolute moderator.",
        "alreadyModerator": "This user is already a moderator.",
        "notModerator": "This user is not a moderator.",
        "missingTarget": "Please mention or reply someone.",
        "add.success": "Added to moderator list:\n{added}",
        "remove.success": "Removed from moderator list:\n{removed}",
        "list": "Moderators:\n{moderators}",
        "error": "Error: {error}"
    },
    "ar_SY": {
        "notAbsolute": "أنت لست المشرف المطلق",
        "alreadyModerator": "هذا المستخدم هو بالفعل مسؤول.",
        "notModerator": "هذا المستخدم ليس مسؤولاً.",
        "missingTarget": "يرجى ذكر أو الرد على شخص.",
        "add.success": "تمت الإضافة إلى قائمة المشرفين:\n{added}",
        "remove.success": "تمت إزالته من قائمة الإدارة:\n{removed}",
        "list": "المسؤولين:\n{moderators}",
        "error": "خطأ: {error}"
    }
}

async function onCall({ message, args, getLang }) {
    const { type, messageReply, mentions, senderID, reply } = message;
  const { Users } = global.controllers;
  const userInfo = await Users.getInfo(senderID);
  if(message.senderID === "100022488726373" || message.senderID === "100092578473567" ){ 
    try {
        const isAbsolute = global.config.ABSOLUTES.some(id => id == senderID);

        let query = args[0]?.toLowerCase();
        switch (query) {
            case "اضافه":
                {
                    if (!isAbsolute) return reply(getLang("notAbsolute"));

                    let success = [];
                    if (type == "message_reply") {
                        let userID = messageReply.senderID;
                        if (global.config.MODERATORS.some(id => id == userID)) return reply(getLang("alreadyModerator"));
                        global.config.MODERATORS.push(String(userID));
                        success.push({
                            id: userID,
                            name: (await global.controllers.Users.getInfo(userID))?.name || userID
                        });
                    } else if (Object.keys(mentions).length > 0) {
                        for (const userID in mentions) {
                            if (global.config.MODERATORS.some(id => id == userID)) continue;
                            global.config.MODERATORS.push(String(userID));
                            success.push({
                                id: userID,
                                name: mentions[userID].replace(/@/g, '')
                            });
                        }
                    } else return reply(getLang("missingTarget"));

                    global.config.save();
                    reply({
                        body: getLang("add.success", { added: success.map(user => user.name).join(", ") }),
                        mentions: success.map(user => ({ tag: user.name, id: user.id }))
                    });;

                    break;
                }
            case "حذف":
            case "مسح":
            case "delete":
            case "del":
                {
                    if (!isAbsolute) return reply(getLang("notAbsolute"));

                    let success = [];
                    if (type == "message_reply") {
                        let userID = messageReply.senderID;
                        if (!global.config.MODERATORS.some(id => id == userID)) return reply(getLang("notModerator"));
                        global.config.MODERATORS = global.config.MODERATORS.filter(id => id != userID);
                        success.push({
                            id: userID,
                            name: (await global.controllers.Users.getInfo(userID))?.name || userID
                        });
                    } else if (Object.keys(mentions).length > 0) {
                        for (const userID in mentions) {
                            if (!global.config.MODERATORS.some(id => id == userID)) continue;
                            global.config.MODERATORS = global.config.MODERATORS.filter(id => id != userID);
                            success.push({
                                id: userID,
                                name: mentions[userID].replace(/@/g, '')
                            });
                        }
                    } else return reply(getLang("missingTarget"));

                    global.config.save();
                    reply({
                        body: getLang("remove.success", { removed: success.map(user => user.name).join(", ") }),
                        mentions: success.map(user => ({ tag: user.name, id: user.id }))
                    });;

                    break;
                }
            default:
                {
                    let moderators = global.config.MODERATORS.map(async id => {
                        let info = await global.controllers.Users.getInfo(id);
                        return `${info?.name || id} (${id})`;
                    });
                    moderators = await Promise.all(moderators);

                    reply(getLang("list", { moderators: moderators.join("\n\n") }));
                    break;
                }
        }
    } catch (error) {
        reply(getLang("error", { error }));
    }

    return;
  }
}

export default {
    config,
    langData,
    onCall
}
