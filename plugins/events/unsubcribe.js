export default async function ({ event }) {
    const log=await global.modules.get("logger");
    const { api } = global;
    const { threadID, author, logMessageData } = event;
    const { Threads, Users } = global.controllers;
    const getThread = await Threads.get(threadID) || {};
    const getThreadInfo = getThread.info || {};

    if (Object.keys(getThreadInfo).length === 0) return;

    const leftMemberIndex = getThreadInfo.members.findIndex(mem => mem.userID == logMessageData.leftParticipantFbId);
    if (leftMemberIndex > -1) {
        delete getThreadInfo.members[leftMemberIndex].exp;
    }

    const type = (author == logMessageData.leftParticipantFbId) ? "left" : "kicked";
    const authorName = (await Users.getInfo(author))?.name || author;

    if (logMessageData.leftParticipantFbId == botID) {
        getThreadInfo.isSubscribed = false;
         let atlertMsg;
          if(type == "kicked"){
           atlertMsg =`×~اشعار~×\n\nالبوت تم طرده من المجموعة ${getThreadInfo.name} بواسطة ${authorName}\nمعرف المستخدم:\n${author}\nمعرف المجموعة:\n${threadID}`;
          } else if(type =="left"){
             atlertMsg =`×~اشعار~×\n\nالبوت خرج من المجموعة ${getThreadInfo.name} ذات المعرف:\n${threadID}`;
          }
        for (const adid of global.config.ABSOLUTES) {
            global.sleep(300);
                api.sendMessage({body:atlertMsg}, adid);
        }

        return;
    } else if (logMessageData.leftParticipantFbId != botID) {
    let callback = async () => {
    try {
        const leftName = (await Users.getInfo(logMessageData.leftParticipantFbId))?.name || logMessageData.leftParticipantFbId;
        let imageStream;
           let alertMsg;
        if (type == "left") {
            imageStream= await global.getStream("https://media.tenor.com/IRCtgc-i9BAAAAAC/im-out-of-here-escape.gif");
            alertMsg = { body: `${leftName}\nهرب من المجموعة بنجاح`, attachment: imageStream };
        } else if (type == "kicked") {
            imageStream= await global.getStream("https://media.tenor.com/kr8l42nG0voAAAAC/the-simpsons-moe.gif");
            alertMsg = { body: `${leftName}\n بلع احلى طرد.`, attachment: imageStream }
        } else {
          imageStream= await global.getStream("https://media.tenor.com/MQLBcEwnwKUAAAAd/pooh-gangnam-style.gif");
          alertMsg = { body: `${leftName}\n باي باي`, attachment: imageStream };}
      
        const gifPath = `${global.mainPath}/plugins/events/unsubscribeGifs/${threadID}.gif`;
        if (global.isExists(gifPath)) {
            alertMsg.attachment = [await global.getStream(gifPath)];
        }
        api.sendMessage(alertMsg, threadID);
    } catch (e) {
        log.custom(e, "ERROR", "error");
    }
};
        if (getThread?.data?.antiSettings?.antiOut && type == "left") {
            global.api.addUserToGroup(logMessageData.leftParticipantFbId, threadID, async (err) => {
                let needNotify = getThread?.data?.antiSettings?.notifyChange === true;
                if (err) {
                    await callback();
                    console.error(err);
                    if (needNotify) global.api.sendMessage(getLang("plugins.events.unsubcribe.antiOut.error"), threadID);
                } else {
                    if (needNotify) global.api.sendMessage(getLang("plugins.events.unsubcribe.antiOut.success"), threadID);
                }
            })
        } else await callback();
    }

    await Threads.updateInfo(threadID, { members: getThreadInfo.members, isSubscribed: getThreadInfo.isSubscribed });

    return;
}
