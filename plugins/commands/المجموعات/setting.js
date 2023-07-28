const config = {
    name: "الاعدادات",
    aliases: ["اعدادات"],
    description: "قم باعداد المجموعة",
    usage: "",
    cooldown: 10,
    permissions: [1,2],
}

const langData = {
    ar_SY: {
        menu: "⌈ اعـدادات الـمـجـموعـة ⌋\n\n1. [{antiSpam}] مكافحة الازعاج\n2. [{antiOut}] مكافحة الخروج\n3. [{antiChangeGroupName}] مكافحة تغيير اسم المجموعة\n4. [{antiChangeGroupImage}] مكافحة تغيير صورة المجموعة\n5. [{antiChangeNickname}] مكافحة تغيير الكنية\n\n6. [{notifyChange}] اخطار احداث المجموعة\n\n⇒ رد بأرقام لاختيار الإعداد الذي تريد تغييره",
        DataNotReady:
            "البيانات ليست جاهزة ، يرجى المحاولة مرة أخرى في وقت لاحق\nاو استعمل: ${prefix}قم بالتحديث وحاول مرة أخرى",
        notGroup: "لا يمكن استخدام هذا الأمر إلا في المجموعة!",
        error: "لقد حدث خطأ، رجاء أعد المحاولة لاحقا",

        invalid: "مدخل غير صالح",
        botNotAdmin:
            "البوت ليس ادمن في هذه المجموعة ، لذلك سيتم تجاهل مكافحة الازعاج ومكافحة الخروج",

        newSettings:
            "اعدادات جديدة:\n\n1. [{antiSpam}] مكافحة الازعاج\n2. [{antiOut}] مكافحة الخروج\n3. [{antiChangeGroupName}] مكافحة تغيير اسم المجموعة\n4. [{antiChangeGroupImage}] مكافحة تغيير صورة المجموعة\n5. [{antiChangeNickname}] مكافحة تغيير الكنية\n\n6. [{notifyChange}] اخطار احداث المجموعة\n\n⇒ تفاعل ب 😆 لحفظ الاعدادات الجديدة",

        success: "تم تغيير الاعدادات بنجاح",
    },
};

async function confirmChange({ message, getLang, data, eventData }) {
    const { reaction } = message;
    if (reaction != "😆") return;

    const { newSettings } = eventData;
    if (!newSettings || !data?.thread?.info)
        return message.send(getLang("error"));

    try {
        await global.controllers.Threads.updateData(message.threadID, {
            antiSettings: newSettings,
        });

        message.send(getLang("success"));
    } catch (e) {
        console.error(e || "WTF");
        message.send(getLang("error"));
    }
}

async function chooseMenu({ message, getLang, data }) {
    try {
        let chosenIndexes = message.args.filter(
            (e) => !!e && !isNaN(e) && e > 0 && e <= 6
        );

        if (chosenIndexes.length == 0) return message.reply(getLang("invalid"));
        const _THREAD = data?.thread;
        if (!_THREAD) return message.reply(getLang("error"));

        const _THREAD_DATA = _THREAD.data;
        const _THREAD_DATA_ANTI_SETTINGS = _THREAD_DATA?.antiSettings;

        const newSettings = {
            antiSpam: !!_THREAD_DATA_ANTI_SETTINGS?.antiSpam,
            antiOut: !!_THREAD_DATA_ANTI_SETTINGS?.antiOut,
            antiChangeGroupName:
                !!_THREAD_DATA_ANTI_SETTINGS?.antiChangeGroupName,
            antiChangeGroupImage:
                !!_THREAD_DATA_ANTI_SETTINGS?.antiChangeGroupImage,
            antiChangeNickname:
                !!_THREAD_DATA_ANTI_SETTINGS?.antiChangeNickname,

            notifyChange: !!_THREAD_DATA_ANTI_SETTINGS?.notifyChange,
        };

        let settingsKeys = Object.keys(newSettings);
        for (const _index of chosenIndexes) {
            const _key = settingsKeys[_index - 1];
            newSettings[_key] = !newSettings[_key];
        }

        let isBotAdmin = data?.thread?.info?.adminIDs?.some(
            (e) => e == global.botID
        );
        if (!isBotAdmin && (newSettings.antiSpam || newSettings.antiOut)) {
            newSettings.antiOut = false;
            newSettings.antiSpam = false;

            await message.reply(getLang("botNotAdmin"));
        }

        const _newSettings = {};

        for (const _key of settingsKeys) {
            _newSettings[_key] = newSettings[_key] ? "✅" : "❌";
        }

        const _newMessage = await message.reply(
            getLang("newSettings", { ..._newSettings })
        );
        _newMessage.addReactEvent({
            callback: confirmChange,
            newSettings,
            participantIDs: message.participantIDs,
        });
    } catch (e) {
        console.error(e || "WTFFF");
        message.reply(getLang("error"));
    }
}

async function onCall({ message, getLang, data, prefix }) {
    if (!data?.thread?.info)
        return message.reply(getLang("DataNotReady", { prefix }));
    if (!data.thread.info.isGroup) return message.reply(getLang("notGroup"));

    const _THREAD_DATA_ANTI_SETTINGS = {
        ...(data.thread.data?.antiSettings || {}),
    };
    for (const _key of [
        "antiSpam",
        "antiOut",
        "antiChangeGroupName",
        "antiChangeGroupImage",
        "antiChangeNickname",
        "notifyChange",
    ]) {
        _THREAD_DATA_ANTI_SETTINGS[_key] = _THREAD_DATA_ANTI_SETTINGS[_key]
            ? "✅"
            : "❌";
    }

    return message
        .reply(getLang("menu", { ..._THREAD_DATA_ANTI_SETTINGS }))
        .then((_) => _.addReplyEvent({ callback: chooseMenu }))
        .catch((e) => {
            console.error(e || "WTFFF");
            message.reply(getLang("error"));
        });
}

export default {
    config,
    langData,
    onCall,
};
