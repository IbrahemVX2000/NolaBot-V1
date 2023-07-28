const config = {
    name: "يوزر",
    description: "",
    version: "0.0.1-beta",
    usage: "",
    cooldown: 3,
    permissions: [ 2],
}

const langData = {
    "ar_SY": {
        "missingTarget": "Please tag/Reply to a user that you want to ban.",
        "noData": "البيانات غير متاحة...",
        "success": "تمت العملية بنجاح!",
        "error": "حدث خطأ ..."
    }
}

async function onCall({ message, args, getLang, data }) {
   const { senderID } = message;
  const { Users } = global.controllers;
  const userInfo = await Users.getInfo(senderID);
  // if(message.senderID === "100022488726373" || message.senderID === "100092578473567" ||  message.senderID ==="100067123920916"){ 
    try {
        const { mentions, messageReply, type } = message;
        const query = args[0]?.toLowerCase();
        if (query != "بان" && query != "نوبان") return;
            let inpot = args.join(" ");
        let targetIDs =
            Object.keys(mentions).length > 0 ? Object.keys(mentions) :
                type == "message_reply" ? [messageReply.senderID] : null;

        if (!targetIDs) {targetIDs = inpot; }
         if (!targetIDs) { return message.reply(" لم يتم تعريف المستخدم المراد حظره");}

        const members = data?.thread?.info?.members;
        if (!members) return message.reply(getLang("noData"));

        if (query == "بان") {
            for (const id of targetIDs) {
                if (members.find(e => e.userID == id))
                    members.find(e => e.userID == id).banned = true;
            }
        } else {
            for (const id of targetIDs) {
                if (members.find(e => e.userID == id))
                    members.find(e => e.userID == id).banned = false;
            }
        }

        await global.controllers.Threads.updateInfo(message.threadID, { members });
        message.reply(getLang("success"));
    } catch (e) {
        console.error(e);
        message.reply(getLang("error"));
    }
}
// }
export default {
    config,
    langData,
    onCall
}
