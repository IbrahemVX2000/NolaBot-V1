const config = {
  name: "انمي",
  description: "صور انمي عشوائية",
  cooldown: 10,
  permissions: [0, 1, 2],
}

const langData = {
  "ar_SY": {
    "error": "خطأ ، حاول مرة أخرى في وقت لاحق..."
  }
}
async function onCall({ message, args, getLang }) {
  try {
    let imageStream;
    let input=args.join(" ");
    if(input){
      input = await global.translate(input,"ar","en");
      message.react("⚙");
       imageStream = await global.searchSafebooruImages(input);
      if(!imageStream) {
    const response = await global.GET(`https://m-rn11-1d00mapiag2ehidden.brhymlhrby3.repl.co/genshin_random`);
    const data = response.data;
    if (!data.data) return message.reply(getLang("error"));
     imageStream = await global.getStream(data.data);}
    } else { 
    message.react("⚙");
    const response = await global.GET(`https://m-rn11-1d00mapiag2ehidden.brhymlhrby3.repl.co/genshin_random`);
    const data = response.data;
    if (!data.data) return message.reply(getLang("error"));
     imageStream = await global.getStream(data.data);}
   
    message.react("✅");
    await message.reply({
      attachment: imageStream
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
}
