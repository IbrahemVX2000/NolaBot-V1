import axios from "axios";
import Replicate from "replicate";
import fetch from "node-fetch";
const config = {
  name: "الشات",
  aliases: [],
  version: "1.1.0",
  description: "دردش مع البوت",
  usage: "[تشغيل/ايقاف]",
  cooldown: 3,
  permissions: [1, 2],
  credits: "IbrahemVX2000"
};
const langData = {
  "ar_SY": {
    "on": "تم التشغيل",
    "off": "تم الايقاف",
    "alreadyOn": "اللهم ثبت علينا العقل والدين",
    "alreadyOff": "الدردشة مطفيه اساسا",
    "missingInput": "شتريد؟",
    "noResult": "  ",
    "error": "حصل خطأ"
  }
};
const replicate = new Replicate({
  auth: ["r8_WFYTgU0sCRS4cs4D1WnnxTYbmvb5Hu70gVMHB"],fetch: fetch,
});
function onLoad() {
  if (!global.hasOwnProperty("bardChat")) global.bardChat = {};
}
async function onCall({ message, args, getLang, userPermissions }) {
  const input = args.join(" ");
  if (!input) return message.reply(getLang("missingInput"));
  if (input === "تشغيل") {
    if (global.bardChat.hasOwnProperty(message.threadID))
      return message.reply(getLang("alreadyOn"));
    global.bardChat[message.threadID] = true;
    return message.reply(getLang("on"));
  } else if (input === "ايقاف") {
    if (!global.bardChat.hasOwnProperty(message.threadID))
      return message.reply(getLang("alreadyOff"));
    delete global.bardChat[message.threadID];
    return message.reply(getLang("off"));
  }
  if (global.bardChat.hasOwnProperty(message.threadID)) return;
  
}
export default {
  config,
  onLoad,
  langData,
  onCall
};