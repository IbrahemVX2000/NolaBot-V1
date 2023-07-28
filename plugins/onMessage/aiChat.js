import axios from "axios";

let i=0;


const onLoad = () => {
  if (!global.hasOwnProperty("aiChat")) global.aiChat = {};
};

const _3Sec = 3000;

const onCall = async ({ message, getLang, data }) => {
  const {type, senderID, threadID, messageReply, body } = message;
    const { Users } = global.controllers;

  if (senderID == global.botID) return;
  if (!global.bardChat.hasOwnProperty(threadID) && !global.bardChat[threadID]) return;

  if (!global.aiChat.hasOwnProperty(message.threadID)) global.aiChat[threadID] = {};
  if (!global.aiChat[threadID].hasOwnProperty(senderID)) global.aiChat[threadID][senderID] = 0;

  if (global.aiChat[threadID][senderID] + _3Sec > Date.now()) return;
  global.aiChat[threadID][senderID] = Date.now();

  try {
    
    if (i == 0) {
      i = 5;
      await message.react("⏳");
      if (!body) {
        return;
      }
      // const translatedInput = await translate(body, "ar", "en");
       const response = await axios.get(`https://bard.shady-api.repl.co/?input=${encodeURIComponent(body)}`);
    const data = response.data;
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
        const imageStream = await global.getStream(imageUrl);
        allImgs.push(imageStream);
        imageCount++;
      }
       await message.react("✅");
      await message.reply({
        body: msg,
        attachment: allImgs
      });
    } else {
      await message.react("✅");
      await message.reply({ body: msg });
    }
      } else if (message.body =="الشات ايقاف") {return;}
    else {
      if (type !== "message_reply") { return;} else { 
        const targetID =messageReply?.senderID ;
        if(targetID != botID){return;}
        
        await message.react("⏳");
        if (!body) {
          return;
        }
         // const translatedInput = await translate(body, "ar", "en");
       const response = await axios.get(`https://bard.shady-api.repl.co/?input=${encodeURIComponent(body)}`);
    const data = response.data;
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
        const imageStream = await global.getStream(imageUrl);
        allImgs.push(imageStream);
        imageCount++;
      }
       await message.react("✅");
      await message.reply({
        body: msg,
        attachment: allImgs
      });
    } else {
      await message.react("✅");
      await message.reply({ body: msg });
    }
      }
    }
  } catch (e) {
    console.error(e);
  }
};

// async function translate(text, sourceLang, targetLang) {
//   const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
//   const res = await global.GET(url);
//   const translation = res.data[0].map((item) => item[0]).join("");
//   return translation;
// }

export default {
  onLoad,
  onCall
};
