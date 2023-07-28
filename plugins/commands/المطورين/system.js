import { cpu, time, cpuTemperature, currentLoad, memLayout, diskLayout, mem, osInfo } from "systeminformation";

const config = {
    name: "النظام",
    description: "شوف معلومات نظام البوت",
    usage: "",
    cooldown: 3,
    permissions: [2],
    credits: "Isai Ivanov"
};

function byte2mb(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

export async function onCall({ message, userPermissions }) {
    const isGroupAdmin = userPermissions.some(p => p === 2 || p === 3);

    const timeStart = Date.now();
let llink ="https://i.postimg.cc/mDW2Qz3s/n-X4m9f3-H-2x.jpg";
    try {
        if (!isGroupAdmin) return message.reply("ليس لديك الصلاحيات المناسبة لاستخدام الأمر");
const imageStream = await global.getStream(llink);
        const { manufacturer, brand, speedMax, physicalCores, cores } = await cpu();
        const { main: mainTemp } = await cpuTemperature();
        const { currentLoad: load } = await currentLoad();
        const { uptime } = await time();
        const diskInfo = await diskLayout();
        const memInfo = await memLayout();
        const { total: totalMem, available: availableMem } = await mem();
        const { platform: OSPlatform, build: OSBuild } = await osInfo();
        const disks = [];

        let hours = Math.floor(uptime / (60 * 60));
        let minutes = Math.floor((uptime % (60 * 60)) / 60);
        let seconds = Math.floor(uptime % 60);
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        let i = 1;
        for (const singleDisk of diskInfo) {
            disks.push(`  ==== 「 القرص ${i++} 」 ====
الاسم: ${singleDisk.name}
النوع: ${singleDisk.interfaceType}
الحجم: ${byte2mb(singleDisk.size)}
درجة الحرارة: ${singleDisk.temperature}°C`);
        }

        if (isGroupAdmin) {
            return message.reply({body: 
                `====== معلومات النظام ======
==== 「 المعالج 」 ====
نوع المعالج: ${manufacturer} ${brand} ${speedMax}GHz
الانوية: ${cores}
عدد المجموعات: ${physicalCores}
درجة الحرارة: ${mainTemp}°C
الحمل على البوت: ${load}%
==== 「 الذاكرة 」 ====
حجم الذاكرة: ${byte2mb(memInfo[0].size)}
نوع الذاكرة: ${memInfo[0].type}
مجمل حجم الذاكرة: ${byte2mb(totalMem)}
المتاح: ${byte2mb(availableMem)}
${disks.join("\n")}
==== 「 نظام التشغيل 」 ====
المنصة: ${OSPlatform}
مبني على: ${OSBuild}
وقت التشغيل: ${hours}:${minutes}:${seconds}
التأخير: ${Date.now() - timeStart}ms`,
      attachment:    imageStream                       });
        }
    } catch (error) {
        console.error(error);
        message.reply("حدث خطأ أثناء تنفيذ الأمر");
    }
}

export default {
    config,
    onCall
};
