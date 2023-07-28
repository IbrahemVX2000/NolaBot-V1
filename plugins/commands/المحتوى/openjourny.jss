import axios from "axios";
import fs from "fs-extra";
import fetch from "node-fetch";
import { writeFileSync } from 'fs';
import { join } from 'path';
import path from "path";
import moment from "moment-timezone";

const config = {
  name: "ارسمي",
  aliases: ["ارسم"],
  description: "رسم بالذكاء الصناعي",
  usage: "نص ما تريد رسمه",
  cooldown: 10,
  permissions: [0, 1, 2],
  isAbsolute: false,
  isHidden: false,
  credits: "IbrahemVX2000",
};

async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  const { threadID, messageID, body, senderID } = message;
  const { Users, Threads } = global.controllers;
  let senderid = message.senderID;
  let sender = await Users.getInfo(senderid);
  let senderName = sender.name;
  let senderGender = sender.gender;
  let Gender;
  if (senderGender === "MALE") {
    Gender = "قام";
  } else {
    Gender = "قامت";
  }

  try {
    message.react("⚙");

    let prompt = body;
    let numImages = 1;

    let translatedPrompt = await translate(prompt, "ar", "en");
    translatedPrompt = translatedPrompt.slice(5, translatedPrompt.length);
    const imagePaths = [];
    const imagePromises = [];

     console.log('\x1b[33m%s\x1b[0m', `The user [${senderid}] ${senderName} created:`,  `\x1b[35m${translatedPrompt}` );
    for (let i = 0; i < numImages; i++) {
      const { data: imageStream } = await axios({
        url: "https://goatbotserver.onrender.com/taoanhdep/texttoimage",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          prompt: translatedPrompt,
          styleId: 27,
          aspect_ratio: "1:1"
        },
        responseType: "stream"
      });

      const imagePath = `${global.cachePath}/drawin${Date.now()}g${i}1.jpg`;
      imagePaths.push(imagePath);
      const writer = fs.createWriteStream(imagePath);
      imageStream.pipe(writer);

      const imagePromise = new Promise((resolve, reject) => {
        writer.on("finish", () => resolve(imagePath));
        writer.on("error", reject);
      });
      imagePromises.push(imagePromise);
    }

    const imagePathsArray = await Promise.all(imagePromises);
    const attachments = imagePathsArray.map(imagePath => fs.createReadStream(imagePath));

    const currentTime = moment().tz("Asia/Riyadh").format("hh:mm A");
    const currentDate = moment().tz("Asia/Riyadh").format("YYYY-MM-DD");
    const replyMessage = {
      body: `${Gender} ${senderName} برسم:\n❰ ${body.slice(5, body.length)} ❱\nبتاريخ:${currentDate}\nالساعة:${currentTime}`,
      attachment: attachments
    };

    await message.react("✔");
    await message.reply(replyMessage);

    for (const imagePath of imagePaths) {
      fs.unlinkSync(imagePath);
    }
  } catch (err) {
    // console.error("gene Error", err);
    message.react("❌");
  }
}

async function translate(text, sourceLang, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await global.GET(url); 
  const translation = res.data[0].map((item) => item[0]).join("");
  return translation;
}

function upload(url) {
    return new Promise(resolve => {
        global.request(`${global.nola_api.main}/imgbb`, {
            method: "POST",
            data: {
                url: url
            }
        }, async (error, res, data) => {
            if (error) {
                console.error(error);
                return resolve(null);
            }

            return resolve(data.url);
        })
    })
}
export default {
  config,
  onCall
};
