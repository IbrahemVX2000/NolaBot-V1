import fetch from "node-fetch";

const config = {
    name: "الرابط",
    aliases: ["الروابط","رابط"],
    description: "تحويل الصور الى انمي",
    usage: "[رد]",
    cooldown: 10,
    permissions: [0, 1, 2],
   isHidden: false,
    credits: "IbrahemVX2000"
};

const langData = {
    "ar_SY": {
        "replyMessage": "الرجاء الرد على الرسالة",
        "noAttachment": "لا يوجد مرفق",
        "noSupportedAttachment": "لا يوجد مرفق مدعوم ، يدعم فقط الصور والصورة المتحركة",
        "uploadFailed": "فشل الرفع",
        "error": "حدث خطأ"
    }
};

const supportedType = ["photo", "animated_image"];


async function onCall({ message, getLang }) {
    try {
        const { type, messageReply } = message;

        if (type != "message_reply") return message.reply(getLang("replyMessage"));

        let { attachments } = messageReply;

        if (!attachments || !attachments.length) return message.reply(getLang("noAttachment"));
        let filteredAttachments = attachments.filter(attachment => supportedType.includes(attachment.type));

        if (!filteredAttachments.length) return message.reply(getLang("noSupportedAttachment"));

        let urls = [];
        for (let attachment of filteredAttachments) {
            let url = await global.getImgUrlByUrl(attachment.url);
            if (!url) continue;
            urls.push(url.image.url);
        }

        if (!urls.length) return message.reply(getLang("uploadFailed"));
        let text ="قائمة الروابط:\n"
         text += urls.join("\n\n");
        return message.reply(text);
    } catch (err) {
        message.reply(getLang("error"));
    }
}

export default {
    config,
    langData,
    onCall
}