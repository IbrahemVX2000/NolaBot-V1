import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import axios from 'axios';

const config = {
  name: "كود",
  aliases: ["adc"],
  version: "1.1.2",
  description: "تعديل ملفات البوت",
  usage: "",
  cooldown: 1,
  permissions: [2],
  credits: "IbrahemVX2000", 
  isAbsolute: true
};


async function onCall({ message, args, data }) {
  const { reply, type, messageReply } = message;
  const { threadID, senderID } = message;
  const PATH = join(global.pluginsPath, "commands");
  const folderCM = readdirSync(PATH);
  const [name, name1] = args;
  const text = type === "message_reply" ? messageReply.body : null;
  if (!text && !name) {
    return reply('الرجاء كتابة اسم الملف لاحضاره');
  }
  if (!text && name) {
    for (const folder of folderCM) {
      const files = readdirSync(join(PATH, folder));
      if (files.includes(`${name}.js`)) {
        const code = readFileSync(join(PATH, folder, `${name}.js`), "utf-8");
        reply(code);
        return;
      }
    }
  } else if (text && name1) {
    if (!existsSync(join(PATH, name))) {
      mkdirSync(join(PATH, name));
    }
    writeFileSync(join(PATH, name, `${name1}.js`), text, "utf-8");
    return reply(`تم حفظ الكود بنجاح باسم ${name1} في المجلد ${name}`);
  }
}

export default {
  config,
  onCall
};
