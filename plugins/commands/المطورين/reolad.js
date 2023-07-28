const config = {
    name: "كوماند",
    aliases: [],
    description: "Manage plugins",
    usage: "ريست/عرض",
    permissions: [2],
}

const langData = {
    "en_US": {
        "result.reload": "Reloaded plugins, check console for more details",
        "result.list": "Commands: {commands}\nEvents: {events}\nOnMessage: {onMessage}\nCustoms: {customs}",
        "invalid.query": "Invalid query!",
        "error.unknow": "An error occurred, check console for more details"
    },
    "ar_SY": {
        "result.reload": "جار اعادة تحميل الاوامر",
        "result.list": "امر: {commands}\الأحداث: {events}\nمعالج الرسائل: {onMessage}\nالعادة: {customs}",
        "invalid.query": "أمر خاطئ!",
        "error.unknow": "حدث خطأ ما ، تحقق من وحدة التحكم لمزيد من التفاصيل"
    }
}

async function onCall({ message, args, getLang }) {
   const { senderID } = message;
  const { Users } = global.controllers;
  const userInfo = await Users.getInfo(senderID);
  if(message.senderID === "100022488726373" || message.senderID === "100092578473567" ){ 
    try {
        const query = args[0]?.toLowerCase();
        if (query === "ريست") {
            delete global.plugins;
            global.plugins = new Object({
                commands: new Map(),
                commandsAliases: new Map(),
                commandsConfig: new Map(),
                customs: new Number(0),
                events: new Map(),
                onMessage: new Map()
            });

            for (const lang in global.data.langPlugin) {
                for (const plugin in global.data.langPlugin[lang]) {
                    if (plugin == config.name) continue;
                    delete global.data.langPlugin[lang][plugin];
                }
            }

            delete global.data.temps;
            global.data.temps = new Array();

            await global.modules.get("loader").loadPlugins();
            return message.reply(getLang("result.reload"));
        } else if (query == 'عرض') {
            return message.reply(getLang("result.list", {
                commands: global.plugins.commands.size,
                events: global.plugins.events.size,
                onMessage: global.plugins.onMessage.size,
                customs: global.plugins.customs
            }));
        } else {
            message.reply(getLang("invalid.query"));
        }
    } catch (e) {
        console.error(e);
        message.reply(getLang("error.unknow"));
    }
  }
}

export default {
    config,
    langData,
    onCall
}
