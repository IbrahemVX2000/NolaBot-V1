import axios from "axios";
import fs from "fs-extra";

const config = {
    name: "تطقيم",
    aliases: ["تطقيمات"],
    description: "صور تطقيمات",
    usage: "",
    cooldown: 10,
    permissions: [0, 1, 2],
    isAbsolute: false,
    isHidden: false,
    credits: "IbrahemVX2000"
};

async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
    try {
        const { data } = await axios.get("https://loufiapitta5qim.ma-pro.repl.co/links?password=" + encodeURIComponent("لوفي"));
        const maleImg = await axios.get(data.male, { responseType: "arraybuffer" });
        const femaleImg = await axios.get(data.female, { responseType: "arraybuffer" });

        fs.writeFileSync("core/var/assets/img1.png", Buffer.from(maleImg.data, "utf-8"));
        fs.writeFileSync("core/var/assets/img2.png", Buffer.from(femaleImg.data, "utf-8"));

        const allImages = [
            fs.createReadStream("core/var/assets/img1.png"),
            fs.createReadStream("core/var/assets/img2.png")
        ];
  
      
        await message.reply({
            attachment: allImages
        });
    } catch (e) {
        console.error(e);
        message.reply("ما في تطقيم للأسف ._.");
    }
}

export default {
    config,
    onCall
};
