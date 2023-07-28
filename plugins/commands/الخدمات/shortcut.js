import { join } from 'path';
import fs from 'fs';

const config = {
  name: "الردود",
  aliases: ["رد","ردود"],
  description: "اضافة اختصار للمجموعة",
  cooldown: 5,
  permissions: [1, 2],
  credits: "IbrahemVX2000",
};

async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  const { type, mentions, messageReply, senderID, threadID } = message;
  const { Threads, Users } = global.controllers;
  const getThread = await Threads.get(message.threadID);
  let threadShortcut = getThread?.info?.shortcut;
  let input = args.join(" ");
 if (input.split(" ")[0] == "حذف") {
    const keyToDelete = input.split(" ")[1];
    if (!keyToDelete) {
      return message.reply("يرجى كتابة اسم الرد لحذفه");
    }
    const deleted = await deleteShortcut(message.threadID, keyToDelete);
    if (deleted) {
      message.reply("تم حذف الرد بنجاح");
    } else {
      message.reply("لم يتم العثور على الرد المحدد لحذفه");
    }
    return;
  }
  else if(input.split(" ")[0] == "اضافة"){
    const shortcut = input.slice(6, input.length);
    const txt = shortcut.split("=");
    if(!txt){return message.reply("يرجى استخدام صيغة اضافه الرد\nمثال:\nالردود اضافة كيفك=بخير")}
    const key = txt[0];
    const Reply = txt[1]; 
    await updateInfo(message.threadID, { shortcut: { [key]: Reply } }); 
    message.reply("تمت اضافة الرد");
    return;
  } else{
    if (threadShortcut) {
    let response = "قائمة الردود:\n";
    for (const key in threadShortcut) {
      if (threadShortcut.hasOwnProperty(key)) {
        response += `الرد: ${key} -> ${threadShortcut[key]}\n`;
      }
    }
    message.reply(response);
  } else {
    message.reply("لا يوجد ردود مضافة في هذه المجموعة.");
  }
  return;
  }
}

async function updateInfo(tid, data) {
    let DATABASE = "JSON";
    if (!tid || !data || typeof data !== "object" || Array.isArray(data)) return false;
    tid = String(tid);
    if (data?.hasOwnProperty("imageSrc")) {
        if (data.imageSrc) {
            data.imageSrc = await saveImg(data.imageSrc);
        }
    }

    var threadData = global.data.threads.get(tid) || null;

    data.members = threadData?.info?.members || [];
    if (data?.participantIDs) {
        for (const participantID of data.participantIDs) {
            if (!data.members.some(e => e.userID == participantID)) {
                data.members.push({
                    userID: participantID
                });
            }
        }
    }

    let invalidIDs = [];
    for (const mem of data.members) {
        if (data.participantIDs && !data.participantIDs.includes(mem.userID)) {
            invalidIDs.push(mem.userID);
        }
    }

    if (invalidIDs.length > 0) {
        data.members = data.members.filter(e => !invalidIDs.includes(e.userID));
    }

    delete data.participantIDs;
    delete data.threadName;
    if (data.members.length == 0) delete data.members;

    if (threadData !== null) {
        
        if (!threadData.info.hasOwnProperty("shortcut")) {
            threadData.info.shortcut = {};
        }

        
        Object.assign(threadData.info.shortcut, data.shortcut);

        global.data.threads.set(tid, threadData);

        if (DATABASE === 'JSON' || DATABASE === 'MONGO') {
            return true;
        }
    } else return create(tid, data);
}


async function deleteShortcut(threadID, keyToDelete) {
  const threadData = global.data.threads.get(threadID) || null;

  if (threadData === null || !threadData.info.hasOwnProperty("shortcut")) {
    return false; 
  }

  if (!threadData.info.shortcut.hasOwnProperty(keyToDelete)) {
    return false; 
  }

  delete threadData.info.shortcut[keyToDelete]; 

  global.data.threads.set(threadID, threadData);

  let DATABASE = "JSON";
  if (DATABASE === 'JSON' || DATABASE === 'MONGO') {
    return true;
  }
}


export default {
  config,
  onCall,
};