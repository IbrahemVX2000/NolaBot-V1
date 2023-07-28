import axios from "axios";
import fs from "fs-extra";

const config = {
  name: "بنتريست",
  aliases: ["بنتريست"],
  description: "بحث عن صور في شبكة",
  cooldown: 10,
  permissions: [0, 1, 2],
};

const langData = {
  "ar_SY": {
    "error": "يرجى إدخال ما تريد البحث عنه"
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
    let allImages = [];
    message.react("⚙");
    for (let i = 0; i < 15; i++) {
      const response = await global.GET(`https://api-dien.kira1011.repl.co/pinterest?search=${translatedInput}`);
      const data = response.data;
      if (!data.data) return message.reply(getLang("error"));

      const randomImage = data.data[Math.floor(Math.random() * data.count)];
      const imageResponse = await axios.get(randomImage, { responseType: "arraybuffer" });

      await fs.outputFile(`core/var/assets/img${i}.png`, Buffer.from(imageResponse.data, "utf-8"));
      allImages.push(fs.createReadStream(`core/var/assets/img${i}.png`));
    }
      message.react("✔");
    await message.reply({
      attachment: allImages
    });


    allImages.forEach(async (image, i) => {
      await fs.remove(`core/var/assets/img${i}.png`);
    });
  } catch (e) {
    console.error(e);
    message.react("❌");
  }
}

export default {
  config,
  langData,
  onCall
};
