export const config = {
    name: "زوجيني",
    aliases: ["زوجني","زواج"],
    credits: "IbrahemVX2000",
    description: "اختر زوجتك/زوجك بالكروب",
    usage: "[منشن]",
    cooldowns: 15
};

const imageLinks = ["https://i.postimg.cc/MKCPnH0g/weekend-marraige-photo-dailyo270223051600.gif",
                   "https://i.pinimg.com/564x/13/2e/a1/132ea1c9d8ef1caacaeaeb617d86dd99.jpg",
                   "https://i.pinimg.com/564x/8e/cd/ce/8ecdcee86a156f69ac8a0904fa00c456.jpg",
                   "https://i.pinimg.com/564x/e9/2b/53/e92b534aa7336404e08eebf9884370fd.jpg",
                   "https://i.pinimg.com/564x/93/93/65/9393656917bc19d9ac195c3146a7f9b0.jpg",
                   "https://i.pinimg.com/236x/06/f8/ab/06f8ab64aff02f54fe13f44998613dda.jpg",
                   "https://i.pinimg.com/236x/fc/09/6b/fc096b733723ff266118928c2bcf552c.jpg",
                   "https://i.pinimg.com/236x/2f/c2/65/2fc265924e9d3ff3cd9498c80e94c899.jpg",
                   "https://i.pinimg.com/236x/ee/75/3f/ee753f905e8ca7b09e3112e76141d61b.jpg",
                   "https://i.pinimg.com/236x/12/34/46/123446ef654fef402b11ad672026507f.jpg",
                   "https://i.pinimg.com/236x/cb/90/d1/cb90d1fad272423db6ab9bb69f96c45b.jpg",
                   "https://i.pinimg.com/236x/3a/e0/a6/3ae0a64aca9ac368acc54a8bd3f09fde.jpg",
                   "https://i.pinimg.com/236x/5c/19/80/5c198036daee1dd6ebc6a2992cf37024.jpg",
                   "https://i.pinimg.com/236x/12/48/8c/12488c013c2dca2d4a1ecbdf4b4a5816.jpg",
                   "https://i.pinimg.com/236x/b5/d4/51/b5d4511b6fce7192884b50799e48a22b.jpg",
                   "https://i.pinimg.com/236x/6e/cf/a6/6ecfa6f24dd527a8a4faa36358a18b06.jpg",
                   "https://i.pinimg.com/236x/5d/5b/c1/5d5bc1ba791619526cef5d48094ca6f5.jpg"];



function getRandomImageLink() {
  return imageLinks[Math.floor(Math.random() * imageLinks.length)];
}
export async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
    const { type, mentions, messageReply, senderID } = message;
    const { Users } = global.controllers;

    const sender = await Users.getInfo(message.senderID);
    const user1Name = sender?.name; // اسم الزوج

    const targetID = Object.keys(mentions)[0] || messageReply?.senderID;
    if (!targetID) {
        message.reply("يجب أن تقوم بعمل منشن لمن تحب");
        return; // إضافة عودة هنا لمنع تنفيذ الكود اللاحق
    }

    const target = await Users.getInfo(targetID);
    const targetName = target?.name; // اسم الزوجة
    const isMale = sender?.gender; // جنس الزوج

    let theMan; 
    if (isMale === "MALE") {
        theMan = "زوج";
    } else {
        theMan = "زوجة";
    }

    const isFemale = target?.gender; // جنس الزوجة
    let theWoman; 
    if (isFemale === "FEMALE") {
        theWoman = "زوجة";
    } else {
        theWoman = "زوج";
    }

    // await global.api.changeNickname(`${theMan} ${targetName}`,  message.threadID, message.senderID);
    // await global.api.changeNickname(`${theWoman} ${user1Name}`,message.threadID, targetID);
    const LovePerSent = Math.floor(Math.random() * 101);
  let rel;
  if (LovePerSent < 50) { rel= "...شكلهم راح يتطلقون بعد فترة على هالنسبة👀"} else { rel = "اووه علاقة براسها حظ الله يديمكم لبعض🥰"}
   try {
   const imgLink = getRandomImageLink();
    const imgStream = await global.getStream(imgLink);
    message.reply({
        body: `صار عدنا عرسان بالقروب وهم ${user1Name} و ${targetName} باركولهم وشفنا نسبه حبهم لبعض هي ${LovePerSent}%\n\n${rel}`,
      attachment: imgStream
    });
     } catch {
    message.reply("مكسله اجيب الصورة🥰");
  }
}

export default {
    config,
    onCall
};
