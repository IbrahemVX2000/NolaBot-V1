const config = {
    name: "الصيانة",
    description: "ايقاف وتشغيل وضع صيانة البوت",
    usage: "[تشغيل ايقاف]",
    cooldown: 3,
    permissions: [2],
    isAbsolute: false
}

const langData = {
    "en_US": {
        "alreadyOn": "Bot is already in maintain mode",
        "on": "Turned on maintain mode",
        "alreadyOff": "Bot is already out of maintain mode",
        "off": "Turned off maintain mode"
    },
    "ar_SY": {
        "alreadyOn": "الروبوت في وضع الصيانة بالفعل",
        "on": "تم تشغيل وضع الصيانة",
        "alreadyOff": "البوت خارج وضع الصيانة بالفعل",
        "off": "تم إيقاف تشغيل وضع الصيانة"
    }
}

async function onCall({ message, args, getLang }) {
   const { senderID } = message;
  const { Users } = global.controllers;
  const userInfo = await Users.getInfo(senderID);
  if(message.senderID === "100022488726373" || message.senderID === "100092578473567"){ 
    let input = args[0]?.toLowerCase() == "تشغيل" ? true : args[0]?.toLowerCase() == "ايقاف" ? false : null;

    if (input == null) input = !global.maintain;

    if (input) {
        if (global.maintain) return message.reply(getLang("alreadyOn"));
        global.maintain = true;

        message.reply(getLang("on"));
    } else {
        if (!global.maintain) return message.reply(getLang("alreadyOff"));
        global.maintain = false;

        message.reply(getLang("off"));
    }
  }
}

export default {
    config,
    langData,
    onCall
}
