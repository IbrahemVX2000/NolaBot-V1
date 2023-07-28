import * as fs from 'fs';
import * as google from "googlethis";
import cloudscraper from 'cloudscraper';

const config = {
  name: "بحث",
  aliases: ["سيرج"],
  version: "1.3.0",
  description: "ابحث عن الصور على الانترنت",
  usage: "ما تريد البحث عنه",
  cooldown: 10,
  permissions: [0, 1, 2],
  credits: "TakiUWU && Isai",//edited by IbrahemVX2000
  dependencies: [
    "axios",
    "fs-extra",
    "googlethis",
    "cloudscraper"
  ]
};

async function onCall({ message, args }) {
  const { senderID, reply } = message;
  try {
    const { Users } = global.controllers;
    let query = args.join(" ");
    if (!query) return message.reply("يرجى ادخال نص للبحث عن الصور");

    message.react("⚙");

    let result = await google.image(query, { safe: false });
    if (result.length === 0) return message.react("❌");

    let streams = [];
    let counter = 0;
    let links = [];

    for (let image of result) {
      if (counter >= 9) break;

      let url = image.url;
      if (!url.endsWith(".jpg") && !url.endsWith(".png") && !url.endsWith(". webp") && !url.endsWith(".jpeg")) continue;

      if (links.includes(url)) continue;

      let path = `${global.cachePath}/search-image-${counter}.jpg`;
      let hasError = false;
      await cloudscraper.get({ uri: url, encoding: null })
        .then((buffer) => fs.writeFileSync(path, buffer))
        .catch((error) => {
          console.log(error)
          hasError = true;
        });

      if (hasError) continue;

      streams.push(fs.createReadStream(path).on("end", async () => {
        if (fs.existsSync(path)) fs.unlink(path, (err) => { if (err) console.log(err); });
      }));

      links.push(url);
      counter += 1;
    }

    let msg = {
      attachment: streams
    };

    message.reply(msg)
      .then(async (msg) => {
        message.react("✔");
      })
      .catch(e => { if (e.message) return message.reply("حدث خطأ ما اثناء البحث"); });
  } catch (e) {
    console.log(e);
    message.react("❌");
  }
}

export {
 config,
 onCall };