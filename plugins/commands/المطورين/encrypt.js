const config = {
    name: "تشفير",
    aliases: [],
    description: "تشفير وفك تشفير الاكواد",
    usage: "[رد]",
    cooldown: 3,
    permissions: [2],
    isAbsolute: true,
    isHidden: false,
    credits: "IbrahemVX2000",
    
}
async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  try{
    const { mentions, messageReply, senderID } = message;
    if(args.join(" ") == "فك"){
      if(!messageReply){return message.reply("يرجى عمل رد لفك التشفير")}
      const txt=message.messageReply.body;
      if(!txt) return;
      const disenc = await global.decrypt(txt,"NOLABOT");
   return message.reply(disenc);
    }
    if(!messageReply){return message.reply("يرجى عمل رد للتشفير")}
    const txt = messageReply.body;
    if(!txt) return;
    const enc = await global.encrypt(txt,"NOLABOT");
    message.reply(enc);
  }catch(e){
    await global.customLog(e,"ERROR","error");
  }
}
export default {
    config,
    onCall
}