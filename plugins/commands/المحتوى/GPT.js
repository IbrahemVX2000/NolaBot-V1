import { Configuration, OpenAIApi } from "openai"

const apiKey = "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"

const config = {
    name: "ai",
    aliases: [""],
    description: "غير مكتمل",
    usage: "text",
    cooldown: 5,
    permissions: [2],
    credits: "Citnut",
    extra: {}
}

const langData = {
    "ar_SY": {
        "openai.needmsg": "لازم تكتب شي",
        "openai.error": "حدث خطأ"
    },
    "en_US": {
        "openai.needmsg": "Need a message!",
        "openai.error": "error..."
    }
}

const configuration = new Configuration({apiKey})
const openai = new OpenAIApi(configuration)

async function onCall ({ message, args, getLang, extra, data, userPermissions, prefix }) {

    if (!args[0]) return message.reply(getLang("openai.needmsg"))
    try {
        const isImage = args[0].toLowerCase() == "صورة";
        const prompt= args.join(" ");

       if (isImage) {
         const response = await openai.createImage({
            prompt: prompt.slice(1),
            n: 1,
            size: '512x512',
            response_format: "url"
         })
         if (response.data.data?.[0]?.url) return message.reply({ attachment: await global.getStream(response.data.data[0].url) });
       } else {
        const res = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2000-prompt.length
        })

        if (res?.data?.choices) return message.reply(res.data.choices[0].text);
       }

        return message.reply(getLang("openai.error"))
    } catch (e) {
        console.log(e)

        return message.reply(getLang("openai.error"))
    }

}


export default {
    config,
    langData,
    onCall
}