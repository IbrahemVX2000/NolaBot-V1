const config = {
  name: "شيوعية",
  aliases: ["شيوعي","الشيوعي"],
  cooldown: 20,
  credits: "IbrahemVX2000"
};

const imageLinks = ["https://gifdb.com/images/file/communism-communist-non-non-biyori-coconut-juice-presx0t2splcp17b.gif",
          "https://gifdb.com/images/file/communism-flag-cute-cat-kitten-3hmk1n5fsa6vgadl.gif",
                    "https://c4.wallpaperflare.com/wallpaper/564/854/422/communism-my-little-pony-brohoof-anypony-friendship-is-magic-wallpaper-preview.jpg",
                    "https://img10.joyreactor.cc/pics/comment/full/%D0%BE%D1%82%D0%BD%D0%BE%D1%88%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BE%D0%B1%D0%B8%D0%B4%D0%B0-%D1%83%D0%B4%D0%B0%D0%BB%D1%91%D0%BD%D0%BD%D0%BE%D0%B5-4576076.jpeg",
                    "https://media.tenor.com/2uTyFORGq3gAAAAS/pouticommunist-communist.gif",
                    "https://media.tenor.com/PA7_rZlLgbkAAAAS/meme-our.gif",
                    "https://media.tenor.com/Gqk5DONplrkAAAAS/communism-communist.gif"
          ];

function getRandomImageLink() {
  return imageLinks[Math.floor(Math.random() * imageLinks.length)];
}


const animeQuestions =["Our friend","مفيش شي اسمه 'لي' كله لنااااا","تحيا النازية","مالفرق بين اليهود والبيتزا؟\nالبيتزا لا تصرخ في الفرن"];
async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  try {
    const { mentions, messageReply, senderID } = message;
    const { Users } = global.controllers;
        const targetID = Object.keys(mentions)[0] || messageReply?.senderID;
    if (!targetID) return message.reply("يجب ان تقوم بالرد على رسالة للشخص او ان تعمل له منشن");
    message.react("⚙");
const randomIndex = Math.floor(Math.random() * animeQuestions.length);
        const question = animeQuestions[randomIndex];
  
    const imgLink = getRandomImageLink();
    const imgStream = await global.getStream(imgLink);
    const targ = await Users.getInfo(targetID);
    const senderName = targ.name;
    // const input = args.join(" ");
    // if (!input) return message.reply("يرجى ادخال نص");
    message.react("✔");
    message.reply({
      body: `${senderName}\n${question}`,
      attachment: imgStream
    });
  } catch {
   message.react("❌");
  }
}
export default {
  config,
  onCall
};
