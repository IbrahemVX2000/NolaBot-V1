import pidusage from"pidusage";

const config = {
  name: "معلومات",
    aliases: ["ابتايم"],
    description: "معلومات نظام البوت",
    usage: "",
    cooldown: 3,
    permissions: [ 1, 2],
    isAbsolute: false,
    isHidden: false,
    credits: "IbrahemVX2000",
};

function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

async function onCall({ message }) {
      let timeStart = Date.now();
      const { senderID, messageID, threadID } = message;
      const { Users,Threads } = global.controllers;
      const getThread=await Threads.getAll();
      const allUsers = await Users.getAll();
      let numUsers =allUsers.length;
      let numThreads =getThread.length;
      let llink ="https://i.postimg.cc/mDW2Qz3s/n-X4m9f3-H-2x.jpg";
      const imageStream = await global.getStream(llink);
  const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);

  const pidInfo = await pidusage(process.pid);

  const uptime = `البوت يعمل منذ ${hours} ساعه و  ${minutes} دقيقة و ${seconds} ثانية.`;
  const cpuUsage = `استهلاك المعالح: ${pidInfo.cpu.toFixed(1)}%`;
  const memoryUsage = `استهلاك الرام: ${byte2mb(pidInfo.memory)}`;
let timeEnd = Date.now();
  message.reply({body:`${uptime}\n${cpuUsage}\n${memoryUsage}\n عدد المجموعات: ${numThreads}\nعدد المستخدمين:${numUsers}\nالتأخير ${timeEnd - timeStart}ms`,attachment:imageStream});
}

export default {
  config,
  onCall
};