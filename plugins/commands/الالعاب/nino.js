const config = {
    name: "سمسمي",
    aliases: ["الدردشة","الدردشه"],
    version: "1.1.0",
    description: "دردش مع البوت",
    usage: "[تشغيل/ايقاف]",
    cooldown: 3,
    permissions: [ 1, 2],
    credits: "IbrahemVX2000"
}

const langData = {
    "ar_SY": {
        "on": "تم التشغيل",
        "off": "تم الايقاف",
        "alreadyOn": "اللهم ثبت علينا العقل والدين",
        "alreadyOff": "اني ساكته اصلا يغبي",
        "missingInput": "شتريد؟",
        "noResult": "  ",
        "error": "Error"
    }
}

function onLoad() {
    if (!global.hasOwnProperty("nino")) global.nino = {};
}

async function onCall({ message, args, getLang, userPermissions }) {
    const input = args.join(" ");
    if (!input) return message.reply(getLang("missingInput"));

   // if (input == "تشغيل" || input == "ايقاف")
     //   if (!userPermissions.includes(1)) return;

    if (input == "تشغيل") {
        if (global.nino.hasOwnProperty(message.threadID)) return message.reply(getLang("alreadyOn"));
        global.nino[message.threadID] = true;

        return message.reply(getLang("on"));
    } else if (input == "ايقاف") {
        if (!global.nino.hasOwnProperty(message.threadID)) return message.reply(getLang("alreadyOff"));
        delete global.nino[message.threadID];

        return message.reply(getLang("off"));
    }
    if (global.nino.hasOwnProperty(message.threadID)) return;

    var responw = global.GET(`https://api.simsimi.net/v2/?text=${encodeURIComponent(input)}&lc=ar`)
        var data= responw.data.success;
  message.reply({body: data})
}

        

export default {
    config,
    onLoad,
    langData,
    onCall
}
