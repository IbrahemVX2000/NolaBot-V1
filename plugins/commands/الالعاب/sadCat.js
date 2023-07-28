const config = {
    name: "احزنني",
    description: "",
    usage: "[text]",
    cooldown: 3,
    permissions: [0, 1, 2],
}

const langData = {
    "vi_VN": {
        "missingInput": "Bạn chưa nhập dữ liệu",
        "error": "Có lỗi xảy ra, vui lòng thử lại sau"
    },
    "en_US": {
        "missingInput": "You haven't entered any text",
        "error": "An error occurred, please try again later"
    },
    "ar_SY": {
        "missingInput": "لم تدخل أي نص",
        "error": "لقد حدث خطأ، رجاء أعد المحاولة لاحقا"
    }
}

async function onCall({ message, args, getLang }) {
    const input = args.join(" ");
    if (input.length == 0) return message.reply(getLang("missingInput"));
     message.react("⚙");
    global
        .getStream(`https://api.popcat.xyz/sadcat?text=${input}`)
        .then(stream => {
          message.react("✔");
            message.reply({ attachment: stream });
        })
        .catch(err => {
            console.error(err);
            message.react("❌");
        })
}

export default {
    config,
    langData,
    onCall
}
