import path from "path";
import imageDo from "image-downloader";
import fs from "fs-extra";
import axios from "axios";
export default async function ({ event }) {
    const { api, config, controllers, sleep, getLang, mainPath, nola_api, getAvatarURL, request, isExists, getStream } = global;
    const { Threads, Users } = controllers;
    const { threadID, author, logMessageData } = event;
    const getThread = await Threads.get(threadID) || {};
    const { data: getThreadData = {}, info: getThreadInfo = {} } = getThread;

    if (Object.keys(getThreadInfo).length > 0) {
        for (const user of logMessageData.addedParticipants) {
            if (!getThreadInfo.members.some(mem => mem.userID == user.userFbId)) {
                getThreadInfo.members.push({ userID: user.userFbId });
            }
        }
    }

    const authorName = (await Users.getInfo(author))?.name || author;

    if (logMessageData.addedParticipants.some(i => i.userFbId == botID)) {
        if (getThreadInfo.isSubscribed === false) {
            getThreadInfo.isSubscribed = true;
        }

        for (const adid of config.ABSOLUTES) {
            sleep(300);
          api.sendMessage({body:`×~اشعار~×\n\nالبوت تمت اضافته الى المجموعة ذات الاسم\n${getThreadInfo.name}\nذات المعرف\n${threadID}\nمن قبل ${authorName}\nصاحب المعرف\n${author}`}, adid);
        }

        const PREFIX = getThreadData.prefix || config.PREFIX;
        api.changeNickname(`✅${config.NAME}✅`, threadID, botID);
        api.sendMessage(getLang("plugins.events.subcribe.connected", { PREFIX }), threadID);

        return;
    } else if (getThreadData?.notifyChange?.status === true) {
        // Handle notifyChange logic here
    }

    const joinNameArray = [];
    const mentions = [];
    const warns = [];
    const allIDS = []; 

    for (const participant of logMessageData.addedParticipants) {
        const uid = participant.userFbId;

        if (getThreadInfo.members.some(mem => mem.userID === uid && mem?.warns?.length >= 3)) {
            warns.push(uid);
            continue;
        }

        const joinName = participant.fullName;
        joinNameArray.push(joinName);
        mentions.push({
            id: uid,
            tag: joinName
        });
        allIDS.push(uid); 
    }

    if (warns.length > 0) {
        for (const uid of warns) {
            await new Promise(resolve => {
                api.removeUserFromGroup(uid, threadID, (err) => {
                    if (err) {
                        console.error(err);
                        return resolve();
                    }

                    const username = logMessageData.addedParticipants.find(i => i.userFbId === uid).fullName;

                    api.sendMessage({
                        body: getLang("plugins.events.subcribe.warns", { username }),
                        mentions: [
                            {
                                id: uid,
                                tag: username
                            }
                        ]
                    }, threadID, (err) => {
                        if (err) {
                            console.error(err);
                        }
                        return resolve();
                    });
                });
            });
        }
    }

    const oldMembersLength = getThreadInfo.members.length - joinNameArray.length;
    const newCount = joinNameArray.map((_, i) => i + oldMembersLength + 1);
    const atlertMsg = {
        body: (getThreadData?.joinMessage || getLang("plugins.events.subcribe.welcome"))
            .replace(/\{members}/g, joinNameArray.join(', '))
            .replace(/\{newCount}/g, newCount.join(', '))
            .replace(/\{threadName}/g, getThreadInfo.name || threadID),
        mentions
    };
     const picURl = await global.getAvatarURL(allIDS[0]) ||null;
     const Picture= await global.streamURL(picURl);
     atlertMsg.attachment =[Picture];
    if (joinNameArray.length > 0) {
        api.sendMessage(atlertMsg, threadID, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }

    await Threads.updateInfo(threadID, {
        members: getThreadInfo.members,
        isSubscribed: getThreadInfo.isSubscribed
    });

    return;
}
