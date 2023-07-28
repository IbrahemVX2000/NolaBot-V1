import { join } from "path";
import { loadImage, createCanvas } from "canvas";

export const config = {
    name: "خرية",
    aliases: ["خريه","shit"],
    version: "0.1",
    credits: "IbrahemVX2000",
    description: "منشن صاحبك",
    usage: "[@منشن]",
    cooldown: 15
};

const kissPath = join(global.assetsPath, "uraShit-template.png");
export async function onLoad() {
    global.downloadFile(kissPath, "https://i.postimg.cc/qvFDmCNm/received-1311208933083701.jpg");
}

export async function makeImage({ one, two }) {
    const template = await loadImage(kissPath);

    let avatarPathOne = join(global.cachePath, `avt_${one}.png`);
    let avatarPathTwo = join(global.cachePath, `avt_${two}.png`);

    await global.downloadFile(avatarPathOne, global.getAvatarURL(one));
    await global.downloadFile(avatarPathTwo, global.getAvatarURL(two));

    const avatarOne = await loadImage(avatarPathOne);
    const avatarTwo = await loadImage(avatarPathTwo);

    const avatarOneCircle = await global.circle(avatarOne, avatarOne.width / 2, avatarOne.height / 2, avatarOne.width / 2);
    const avatarTwoCircle = await global.circle(avatarTwo, avatarTwo.width / 2, avatarTwo.height / 2, avatarTwo.width / 2);

    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(avatarOneCircle, 3110, 100, 300, 300);
    ctx.drawImage(avatarTwoCircle, 250,500, 100, 100);

    const pathImg = join(global.cachePath, `kiss_${one}_${two}.png`);
    const imageBuffer = canvas.toBuffer();

    global.deleteFile(avatarPathOne);
    global.deleteFile(avatarPathTwo);

    global.writeFile(pathImg, imageBuffer);
    return pathImg;
}

export async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
    const { senderID, mentions } = message;
    const mention = Object.keys(mentions);
    if (!mention[0]) return message.reply("يرجى وضع علامة على شخص ما.");
    else {
      const { Users } = global.controllers;
const userInfo = await Users.getInfo(mention[0]);
const userName25 = userInfo?.name;
      
        const one = senderID, two = mention[0];
        return makeImage({ one, two })
            .then(async path => {
                await message.reply({
                  body: `ايع مشيت فوق خرية تسمى ${userName25}`,
                    attachment: global.reader(path)
                }).catch(e => {
                    message.reply("شكلك مشيت سلامات اليوم بدون ما تدعس على خرية");
                    console.error(e);
                });

                global.deleteFile(path);
            })
            .catch(e => {
                message.reply("شكلك مشيت سلامات اليوم بدون ما تدعس على خرية");
                console.error(e);
            });
    }
}