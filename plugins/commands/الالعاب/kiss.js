import { join } from "path";
import { loadImage, createCanvas } from "canvas";

export const config = {
    name: "بوسة",
    aliases: ["بوسه","قبلة","قبله","هاتي بوسة","هاتي بوسه","هات بوسه","هات بوسة"],
    version: "0.1",
    credits: "Clarence DK",
    description: "خذ بوسة ممن تحب",
    usage: "[@منشن]",
    cooldown: 15
};

const kissPath = join(global.assetsPath, "kiss-template.png");
export async function onLoad() {
    global.downloadFile(kissPath, "https://aniyuki.com/wp-content/uploads/2022/05/aniyuki-anime-kiss-image-29.jpg");
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
    ctx.drawImage(avatarOneCircle, 310, 100, 300, 300);
    ctx.drawImage(avatarTwoCircle, 1000,300, 300, 300);

    const pathImg = join(global.cachePath, `kiss_${one}_${two}.png`);
    const imageBuffer = canvas.toBuffer();

    global.deleteFile(avatarPathOne);
    global.deleteFile(avatarPathTwo);

    global.writeFile(pathImg, imageBuffer);
    return pathImg;
}

export async function onCall({ message }) {
    const { senderID, mentions } = message;
    const mention = Object.keys(mentions);
    if (!mention[0]) return message.reply("يرجى وضع علامة على شخص ما.");
    else {
      message.react("⚙");
        const one = senderID, two = mention[0];
        return makeImage({ one, two })
            .then(async path => {
              message.react("✔");
                await message.reply({
                    attachment: global.reader(path)
                }).catch(e => {
                    message.reply("ما عندك نصيب تاخذ بوسة اليوم.");
                    console.error(e);
                });

                global.deleteFile(path);
            })
            .catch(e => {
               message.react("❌");
                console.error(e);
            });
    }
}