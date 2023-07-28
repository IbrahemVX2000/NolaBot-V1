import wiki from 'wikijs'

const config = {
    name: "ويكي",
    description: "بحث في ويكيبيديا",
    usage: "",
    cooldown: 30,
    permissions: [0, 1, 2],
    credits: "IbrahemVX2000"
}

const langData = {
    
    "ar_SY": {
        "missingInput": "بيانات مفقودة!",
        "noResult": "لم يتم العثور على نتائج!",
        "error": "لقد حدث خطأ، رجاء أعد المحاولة لاحقا"
    }
}

const supportedLanguages = ["en_US", "vi_VN", "ar_SY"];

function getSystemLanguage() {
    if (supportedLanguages.includes(global.config.LANGUAGE)) {
        return global.config.LANGUAGE;
    } else {
        return "ar_SY";
    }
}

async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
    const input = args.join(" ");
    if (!input) return message.reply(getLang("missingInput"));

    wiki({ apiUrl: "https://ar.wikipedia.org/w/api.php" })
        .find(input)
        .then(async (page) => {
            try {
                const summary = await page.summary();

                await message.reply(summary);
            } catch (error) {
                return message.reply(getLang("noResult"));
            }
        })
        .catch((err) => {
            console.error(err);
            message.reply(getLang("error"));
        });
}

export default {
    config,
    langData,
    onCall
}
