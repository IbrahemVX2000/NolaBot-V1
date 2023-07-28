import axios from "axios";
import fs from "fs-extra";
import FormData from "form-data";
import path from "path";
import image from "image-downloader";

const config = {
  name: "ازالة",
  aliases: ["ازاله"],
  description: "ازاالة خلفية اي صورة",
  usage: "[رد للصورة]",
  cooldown: 3,
  permissions: [0, 1, 2],
  isAbsolute: false,
  isHidden: false,
  credits: "IbrahemVX2000",
};

const supportedType = ["photo", "animated_image"];

function upload(url) {
  return new Promise((resolve) => {
    global.request(
      `${global.nola_api.main}/imgbb`,
      {
        method: "POST",
        data: {
          url: url,
        },
      },
      async (error, res, data) => {
        if (error) {
          console.error(error);
          return resolve(null);
        }
        return resolve(data.url);
      }
    );
  });
}

async function onCall({message, args, getLang, extra, data, userPermissions, prefix,}) {
  try {
    const { type, messageReply } = message;

    if (type != "message_reply") return message.reply("يرجى الرد على صورة");

    let { attachments } = messageReply;

    if (!attachments || !attachments.length)
      return message.reply("هذه ليست صورة😾");
    let filteredAttachments = attachments.filter((attachment) =>
      supportedType.includes(attachment.type)
    );

    if (!filteredAttachments.length)
      return message.reply("نوع البيانات غير مدعوم");

    let urls = [];
    for (let attachment of filteredAttachments) {
      let url = await upload(attachment.url);
      if (!url) continue;
      urls.push(url);
    }

    if (!urls.length) return message.reply("فشل الرفع");

    let text = urls.join("\n");

    const KeyApi = [
      "t4Jf1ju4zEpiWbKWXxoSANn4",
      "CTWSe4CZ5AjNQgR8nvXKMZBd",
      "PtwV35qUq557yQ7ZNX1vUXED",
      "wGXThT64dV6qz3C6AhHuKAHV",
      "82odzR95h1nRp97Qy7bSRV5M",
      "4F1jQ7ZkPbkQ6wEQryokqTmo",
      "4F1jQ7ZkPbkQ6wEQryokqTmo",
      "sBssYDZ8qZZ4NraJhq7ySySR",
      "NuZtiQ53S2F5CnaiYy4faMek",
      "f8fujcR1G43C1RmaT4ZSXpwW",
      "DEmhjWFJxmEnZCazVc6L2urs",
    ];

    const inputPath = path.resolve(`${global.cachePath}/10202.jpg`);
    await image.image({
      url: text,
      dest: inputPath,
    });


    const formData = new FormData();
    formData.append("size", "auto");
    formData.append(
      "image_file",
      fs.createReadStream(inputPath),
      path.basename(inputPath)
    );


    axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: formData,
      responseType: "arraybuffer",
      headers: {
        ...formData.getHeaders(),
        "X-Api-Key": KeyApi[Math.floor(Math.random() * KeyApi.length)],
      },
      encoding: null,
    })
      .then((response) => {

        if (response.status != 200)
          return console.error("Error:", response.status, response.statusText);
        fs.writeFileSync(inputPath, response.data);
        return message.reply(
          { attachment: fs.createReadStream(inputPath) },
          () => fs.unlinkSync(inputPath)
        );
      })
      .catch((error) => {
        return console.error("Request failed:", error);
      });
  } catch (err) {
    message.reply("حدث خطأ ما");
  }
}

export default {
  config,
  onCall,
};
