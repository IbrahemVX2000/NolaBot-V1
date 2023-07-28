import { join } from 'path';
import fs from 'fs';

async function streamURL(url) {
  const dest = join(`${global.cachePath}/1.png`);
  if (isURL(url)) {
    await downloadFile(dest, url);
  } else {
    await saveFromBase64(dest, url);
  }
  setTimeout(j => fs.unlinkSync(j), 60 * 1000, dest);
  return fs.createReadStream(dest);
};

async function onCall({ message }) {
  const { threadID } = message;
  const { Threads } = global.controllers;
  const info = (await Threads.get(threadID)).info;
  const oldImage = info.imageSrc || null;
  message.reply({
    body: "هذه صورة المجموعة",
    attachment: await streamURL(oldImage),
  });
}

export default {
  config: {
    name: "pp",
    aliases: ["groupimg"],
    permissions: [ 2],
    description: "يعرض صورة المجموعة",
    usage: "",
    credits: "",
    isHidden: false
  },
  onCall,
};