import axios from 'axios';

const config = {
  name: "بارد",
  aliases: ["Bard","bard"],
  description: "صور انمي عشوائية",
  cooldown: 10,
  permissions: [0, 1, 2],
};

const langData = {
  "ar_SY": {
    "error": "خطأ، حاول مرة أخرى في وقت لاحق..."
  }
};

async function onCall({ message, args, getLang }) {
  try {
    let input = args.join(" ");
    if(!input){return message.reply("يرجى ادخال نص")}
    message.react("⚙");
   // const translatedInput = await translate(input, "ar", "en");
    const response = await axios.get(`https://bard.shady-api.repl.co/?input=${encodeURIComponent(input)}`);
    const data = response.data;
    // console.log(response.data)
    let cotta;
    let putta;
    if(response.data.split("'content':")[1].split('"')[1]){
      cotta='"';
      putta='", ';
    } else {
      cotta="'";
      putta="', ";
    }
    let msg = data.split("'content':")[1].split(cotta)[1].split(putta)[0];
    let images = data.match(/'(https?:\/\/[^']+\.(?:jpg|png))'/g); 
    if(!msg){return message.reply("حدث خطأ.")}
    msg = msg.replace(/\\n/g, "\n"); 
    msg = msg.replace(/\\r/g, "\r");
    msg = msg.replace(/\*\*/g, ""); 
    msg = msg.replace(/\[[^\]]+\]/g, ""); 
    // const translatedOuput = await translate(msg, "en", "ar");
    if (images) {
      let allImgs = [];
      let imageCount = 0;
      for (let i = 0; i < images.length && imageCount < 6; i++) {
        const imageUrl = images[i].slice(1, -1);
        // console.log(imageUrl);
        const imageStream = await global.getStream(imageUrl);
        allImgs.push(imageStream);
        imageCount++;
      }
      message.react("✔");
      await message.reply({
        body: msg,
        attachment: allImgs
      });
    } else { 
      message.react("✔");
      await message.reply({ body: msg });
    }
  } catch (e) {
    message.react("❌");
    console.error(e);
  }
}
async function translate(text, sourceLang, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await global.GET(url);
  const translation = res.data[0].map((item) => item[0]).join("");
  return translation;
}
export default {
  config,
  langData,
  onCall
};
