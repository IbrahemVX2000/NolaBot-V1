const config = {
    name: "اكتبي",
    aliases: [],
    description: "دع البوت يكتب ما تريد",
    usage: "[اكتب]",
    cooldown: 3,
    permissions: [0, 1, 2],
    isAbsolute: false,
    isHidden: false,
    credits: "IbrahemVX2000",
    
}



async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
        const { Users, Threads } = global.controllers;
        const { type, messageReply,threadID, messageID, body, senderID } = message;
         let senderid = message.senderID;
         let sender = await Users.getInfo(senderid);
         let senderName = sender.name;
         let senderGender = sender.gender;
         let Gender;
         if (senderGender === "MALE") {
          Gender = "طلب";
          } else {
          Gender = "طلبت";
         }
         let prompt=args.join(" ");
         message.reply(`${senderName}\n${Gender} مني ان اكتب "${prompt}" 👀`);
  return;
}
  
export default {
    config,
    onCall
}
