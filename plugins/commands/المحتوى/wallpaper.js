const config = {
  name: "خلفيات",
 aliases: ["خلفية","خلفيه"],
  description: "خلفيات انمي مختلفة",
  cooldown: 30,
  permissions: [0, 1, 2],
}

const langData = {
  "ar_SY": {
    "error": "ما في خلفيات🙂💔"
  }
}
async function onCall({ message, args, getLang }) {
  try {
    const response = await global.GET(`https://m-rn11-1d00mapiag2ehidden.brhymlhrby3.repl.co/genshin_random`);
    const data = response.data;
    if (!data.data) return message.reply(getLang("error"));
    const imageStream = await global.getStream(data.data);
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
}
