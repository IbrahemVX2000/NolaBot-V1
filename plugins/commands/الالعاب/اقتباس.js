import axios from 'axios';

const config = {
    name: "اقتباس",
    description: "اقتباسات انمي",
    usage: "",
    cooldown: 10,
    permissions: [0, 1, 2],
    credits: "IbrahemVX2000"
}

const langData = {

    "ar_SY": {
        "noResults": "لم يتم العثور على نتائج",
        "results": "•انمي {anime}\n• الشخصية: {character}\n• الاقتباس: {quote}",
        "error": "حدث خطأ، يرجى المحاولة مرة أخرى لاحقًا."
    }
}



async function onCall({ message, args, getLang }) {
    try {
        message.react("⚙");
        const textExtra = ["https://i.ibb.co/RYNcn22/photo-2023-07-23-01-06-53.jpg",
                          "https://wallpaperaccess.com/thumb/9070071.png",
                          "https://1.bp.blogspot.com/-xa_ehfJbDGs/YCuHeO2fQ4I/AAAAAAABHFE/xGZTmohSQd4kL3w_rMgs-jNpsvNBYEPQQCLcBGAsYHQ/s2560/dolphins-sky-clouds-5k-gg-2560x1440.jpg",
                          "https://1.bp.blogspot.com/-TA6tfVLezkQ/X_6K_ytZ5-I/AAAAAAABDYw/8aXqJHbMbYIBV6bjHPJLRVuOnT7mt5R6gCLcBGAsYHQ/s2560/shark_dolphin_sea_130036_1920x1080.jpg",
                          "https://i.ibb.co/NYnkhpF/joined.jpg"];
        const txtExtra= textExtra[Math.floor(Math.random() * textExtra.length)];
        const imageStream = await global.getStream(txtExtra);
        let url ="https://api.quotable.io/random";
        const response = await global.GET(url);
        const data = response.data;
        if (!data) return message.react("❌");
        const translatedQuote = await global.translate(data.content, "en","ar");
        const translatedCharacter = await global.translate(data.author, "en","ar");
       message.react("✔");
        await message.reply({body:`• القائل: ${translatedCharacter}/${data.author}\n\n•الاقتباس: ${translatedQuote}\n${data.content}`,attachment: imageStream});
    } catch (e) {
        console.error(e);
        message.react("❌")
    }
}

export default {
    config,
    langData,
    onCall
}
