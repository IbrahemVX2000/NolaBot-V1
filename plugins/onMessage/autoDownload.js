import fs from "fs-extra";
import axios from "axios"

async function getLink(url) {
    return new Promise((resolve, reject) => {
        axios({
            method: "GET",
            url: `https://nguyenmanh.name.vn/api/autolink?url=${url}&apikey=8cJLoNGe`
        }).then(res => resolve(res.data)).catch(err => reject(err));
    });
}
async function onCall({ message, getLang, data }) {
    const { senderID, messageID, threadID,reply,body } = message;
    if(global.isURL(body)){
      if(body.endsWith(".jpg") || body.endsWith(".jpeg") || body.endsWith(".png")){return;}
      if(body.slice(0,12) != "https://yout") {return;}
      let type= "mp4";
      var path = `${global.cachePath}/vid.${type}`;
      try{
          message.react("⚙");
        const res = await getLink(body);
        let url = res.result.video.hd || res.result.video.sd || res.result.video.nowatermark || res.result.video.watermark;
        const response = await axios({
      method: "GET",
      url: url,
      responseType: "arraybuffer",
    });
        fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));
         if (fs.statSync(path).size / 1024 / 1024 > 46) {
           message.react("❌");
      return message.reply("الملف كبير جدا", () => fs.unlinkSync(path));
    } else {
           message.react("✔");
     return message.reply({
          attachment: fs.createReadStream(path)},() => fs.unlinkSync(path));
    }
      }catch(e){
        console.log(e)
        message.react("❌");
      }
    }

  
}

export default {
    onCall
}
