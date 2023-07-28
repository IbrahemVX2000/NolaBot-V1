const config = {
  name: "صورة",
  aliases: ["صوره"],
  description: "بحث عن صور عالنت",
  cooldown: 10,
  permissions: [0, 1, 2],
};

const langData = {
  "ar_SY": {
    "error": "يرجى ادخال ما تريد البحث عنه"
  }
};

async function translate(text, sourceLang, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await global.GET(url);
  const translation = res.data[0].map((item) => item[0]).join("");
  return translation;
}

async function onCall({ message, args, getLang }) {
  try {
    const input = args.join(" ");
    if (!input) return message.reply(getLang("error"));

    const translatedInput = await translate(input, "ar", "en");
    const response = await global.GET(`https://api-dien.kira1011.repl.co/pinterest?search=${translatedInput}`);
    const data = response.data;
    if (!data.data) return message.reply(getLang("error"));

    const randomImage = data.data[Math.floor(Math.random() * data.count)];
    const imageStream = await global.getStream(randomImage);
    await message.reply({
      attachment: [imageStream]
    });
  } catch (e) {
    console.error(e);
    message.reply(getLang("error"));
  }
}

export default {
  config,
  langData,
  onCall
};
