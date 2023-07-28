const config = {
    name: "ترسيت",
    aliases: ["rs", "rest", "reboot"],
    permissions: [2],
    isAbsolute: true
}

async function onCall({ message, getLang }) {
   const { senderID } = message;
  const { Users } = global.controllers;
  const userInfo = await Users.getInfo(senderID);
  if(message.senderID === "100022488726373" || message.senderID === "100092578473567" ){ 
    await message.reply("جار اعادة تشغيل البوت...");
    global.restart();
  }
}

export default {
    config,
    onCall
}
