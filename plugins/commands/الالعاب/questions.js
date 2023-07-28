
const config = {
    name: "حزورة",
    aliases: ["حزوره"],
    version: "1.1.0",
    description: "خلي البوت يختبر معرفتك",
    usage: "",
    cooldown: 10,
    permissions: [0, 1, 2],
    credits: "IbrahemVX2000"
}

function onLoad() {
    if (!global.hasOwnProperty("questions")) global.questions = {};
}

async function onCall({ message, args, getLang, userPermissions }) {

        global.questions[message.threadID] = true;

        // delete global.nino[message.threadID];

 //  const json = JSON.parse(fs.readFileSync('Question.json'));
 //  const Qdata = json[Math.floor(Math.random() * json.length)];
 //  let q = Qdata.Qname
 //  let a = Qdata.Qanswer
 // message.reply({ body:`${q}`})

  // message.react("⚙");
  message.reply(`يرجى الرد بكلمة ابدا لبدأ اللعبه^^`);
}

export default {
    config,
    onLoad,
    onCall
}
