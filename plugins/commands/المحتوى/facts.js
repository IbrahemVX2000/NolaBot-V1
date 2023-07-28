const config = {
  name: "حقائق",
  aliases: ["حقائق عن","حقايق"],
  description: "حقائق مختلفه عن الحيوانات",
  usage: "[]",
  cooldown: 10,
  credits: "IbrahemVX2000",
};
async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  try{
    let type = args.join(" ");
    if (type === "القطط" || type === "قطط") {
      const response = await global.GET(`https://some-random-api.com/facts/cat`);
      //const data = response.data.fact;

      const data = await translate(response.data.fact, "en", "ar");
      
      const Imgres = await global.GET(`https://some-random-api.com/img/cat`);
      const ImagCat = Imgres.data.link;
      const imageStream = await global.getStream(ImagCat);
      message.reply({
        body:  `هل كنت تعلم ان:\n${data}`, attachment: [imageStream]
      });
    } else if (type === "الكلاب" || type === "كلاب") {
      const response = await global.GET(`https://some-random-api.com/facts/dog`);
      //const data = response.data.fact;
      const data = await translate(response.data.fact, "en", "ar");

      const Imgres = await global.GET(`https://some-random-api.com/img/dog`);
      const ImagCat = Imgres.data.link;
      const imageStream = await global.getStream(ImagCat);
      message.reply({
        body:  `هل كنت تعلم ان:\n${data}`, attachment: [imageStream]
      });
    } else if (type === "الطيور" || type === "طيور") {
      const response = await global.GET(`https://some-random-api.com/facts/bird`);
      //const data = response.data.fact;
      const data = await translate(response.data.fact, "en", "ar");

      const Imgres = await global.GET(`https://some-random-api.com/img/bird`);
      const ImagCat = Imgres.data.link;
      const imageStream = await global.getStream(ImagCat);
      message.reply({
        body: `هل كنت تعلم ان:\n${data}`, attachment: [imageStream]
      });
    } else if (type === "الثعالب" || type === "ثعالب") {
      const response = await global.GET(`https://some-random-api.com/facts/fox`);
      //const data = response.data.fact;
      const data = await translate(response.data.fact, "en", "ar");

      const Imgres = await global.GET(`https://some-random-api.com/img/fox`);
      const ImagCat = Imgres.data.link;
      const imageStream = await global.getStream(ImagCat);
      message.reply({
        body: `هل كنت تعلم ان:\n${data}`, attachment: [imageStream]
      });
    } else if (type === "الكوالا" || type === "كوالا") {
      const response = await global.GET(`https://some-random-api.com/facts/koala`);
      //const data = response.data.fact;
      const data = await translate(response.data.fact, "en", "ar");

      const Imgres = await global.GET(`https://some-random-api.com/img/koala`);
      const ImagCat = Imgres.data.link;
      const imageStream = await global.getStream(ImagCat);
      message.reply({
        body: `هل كنت تعلم ان:\n${data}`, attachment: [imageStream]
      });
    } else if (type === "باندا" || type === "الباندا") {
      const response = await global.GET(`https://some-random-api.com/facts/panda`);
      //const data = response.data.fact;
      const data = await translate(response.data.fact, "en", "ar");

      const Imgres = await global.GET(`https://some-random-api.com/img/panda`);
      const ImagCat = Imgres.data.link;
      const imageStream = await global.getStream(ImagCat);
      message.reply({
        body: `هل كنت تعلم ان:\n${data}`, attachment: [imageStream]
      });
    } else if(type === "عشوائي" || type === "عشوائية"){
            const response = await global.GET(`https://api.popcat.xyz/fact`);

           let res=await translate(response.data.fact, "en", "ar");
      message.reply(res);
    }
    
    else {
      message.reply("يرجى الاختيار عند تنفيذ الامر من بين:\n طيور او كلاب او قطط او ثعالب او كوالا او باندا او عشوائي");
    }
  } catch (e) {
        console.error(e);
        message.reply("والله مبيه حيل اجيبهم روح دبر نفسك");
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
  onCall
};
