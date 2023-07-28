import axios from "axios";
import { join } from "path";
import fs from "fs-extra";
const config = {
  name: "ارسمي",
  aliases: ["ارسم","draw","Draw"],
  description: "رسم بالذكاء الصناعي",
  usage: "نص ما تريد رسمه",
  cooldown: 10,
  permissions: [0, 1, 2],
  isAbsolute: false,
  isHidden: false,
  credits: "IbrahemVX2000",
};


async function onCall({ message, args }) {
  const log=await global.modules.get("logger");
  const { threadID, messageID, body, senderID } = message;
  try {
    let timeStart = Date.now();
    const user = await global.userData(senderID);
    const senderName = user.name;
    const senderGender = user.gender;
    const gender = senderGender === "MALE" ? "قام" : "قامت";
    
    let req=args.join(" ");
    if(!req){return message.reply("الرجاء ادخال نص للرسم.");}
    let txt =req.split("|")[0];
    
    const translatedInput = await global.translate(txt, "ar", "en");
    let prompt = translatedInput.slice(0, translatedInput.length) + ",4k photo";
    
   let num =body.split("|")[1];
    if(num < 1){return message.reply("لايمكن استخدام 0");}
    if(num >= 5){return message.reply("يرجى ادخال رقم موديل بين 1 و 4 فقط");}
    
    // const numImages = num || 1;
       const numImages = 1;
       let model= num || 1;

    
        message.react("⚙");
    // if(numImages > 1){ message.reply("جاري الرسم...\nقد تستغرق العملية بعض الوقت.")}
    log.custom( `The user who has id ${senderID} and Name ${senderName} created: ${prompt}`, `LOG`,"ghost");
    
    const imagePromises = [];
    let Alurl=[];
    let url;
    
    const APIURL =[`https://drawingapi12.brhymhsm1.repl.co/create?model=${model}&query=${encodeURIComponent(prompt)}`];
    const API= APIURL[Math.floor(Math.random() * APIURL.length)];

    
    for (let i = 0; i < numImages; i++) {
      
      const { data: imageStream } = await axios({
        url: API,
        method: "GET",
        responseType: "stream"
      });

      url = await global.getImgUrl(imageStream);
      const cachePath = join(global.cachePath, `_d_rawed${Date.now()}.png`);
      const imaged = await global.downloadFile(cachePath,url.image.url);
      const image = fs.createReadStream(imaged);
      // const image = await global.ImageDown(url.image.url);
      imagePromises.push(image);
      Alurl.push(url.image.url);
      
      log.custom( `Image saved sucssfully for: ${prompt},url: ${url.image.url}`,"DRAWED","ghost");
    }
       const time= await global.timeNow();
       let timeEnd = Date.now();
       let timedelay= timeEnd - timeStart ;
    
       message.react("✔");
      await message.reply({
      body: `${gender} ${senderName} برسم:\n❰ ${txt} ❱\nبتاريخ:${time.date}\nالساعة:${time.time}\nعدد الصور: ${numImages}\nزمن الرسم: ${timedelay * 0.001} ثانيه\nروابط الصور:\n${Alurl.join("\n\n")}`,
      attachment: imagePromises
    });

    // await fs.unlink(inputPath);
  } catch (error) {
    message.react("❌");
    log.custom(error,"ERROR","error")
  }
}

export default {
  config,
  onCall
};
