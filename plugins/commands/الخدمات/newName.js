const config = {
    name: "كنية",
    aliases: ["كنيه"],
    description: "تلاعب بكنية الاعضاء",
    usage: "اذا تكتب كنية فقط راح يختار البوت كنية عشوائة لك واذا تكتب كنية ثم اي شي راح يضعها البوت لك واذا ترد على شخص وتقوم بنفس الامور البوت يقوم بالامور نفسها ولكن للشخص الثاني",
    cooldown: 10,
    permissions: [0, 1, 2],
    credits: "IbrahemVX2000",
    
}


async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
const { type, mentions, messageReply, senderID } = message;
    const { Users } = global.controllers;
const male=["ابو خشم","ابو راس مربع","الزنجي","الكذاب القصير","شيخ الكروب","الخروف","المحنك","الكرنجي","ملة فسفس","يروح للسينما وياك ب1$","الرخيص","الغالي","عبقرينو","لا انا ولا انت نفهم انا شوضعي"]
  const randomIndex = Math.floor(Math.random() * male.length);
        const maleName = male[randomIndex];//random man name
  const female=["زاحفة للركب","الوان","تدعي اللطافة","ما يحتاج اقول انها كذابه🙆‍♀️","تكره الكل","عندها اكتئاب","تحب جنغلق والعياذ بالله","بيننا؟ لازمها تربية","وقحة","طيبة","وردة","وايفو","تقية","الله يشهد امثالها متدري شتحجي عنهم"]
    const randomIndex2 = Math.floor(Math.random() * female.length);
        const feMaleName = female[randomIndex2];//random woman name
       const targetID = messageReply?.senderID  || senderID; 

   const sender = await Users.getInfo(targetID);
  const user1Nmae = sender?.name;
  const userGender = sender?.gender;
    const newNmae=args.join(" ");
  let userFinalNmae;
  if (!newNmae) {
  if (userGender === "MALE") { userFinalNmae=maleName; } else { userFinalNmae=feMaleName; }
  } else {userFinalNmae=newNmae;}
const toAPI =  await global.api.changeNickname(`${userFinalNmae}`,  message.threadID, targetID);
 message.react(`✔`);
}
  
export default {
    config,
    onCall
}
