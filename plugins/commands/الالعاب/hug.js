const config = {
  name: "عناق",
  aliases: [],
  cooldown: 20,
  credits: "IbrahemVX2000"
};

const imageLinks = ["https://gifdb.com/images/file/young-boy-and-girl-hug-by84y66ukekgd01g.gif",
          "https://media.tenor.com/c3CBzmFnqHYAAAAi/hug.gif",
          "https://media.tenor.com/IMqzdWL6LpwAAAAi/super-bowl.gif",
          "https://i.pinimg.com/originals/0b/de/eb/0bdeebd6e8c9ec6e791f53c97f962b87.gif",
          "https://i.pinimg.com/originals/f4/cf/11/f4cf111515c51d3e9faa2186e1432937.gif",
          "https://aniyuki.com/wp-content/uploads/2022/06/anime-hugs-aniyuki-56.gif",
          "https://aniyuki.com/wp-content/uploads/2022/06/anime-hugs-aniyuki-51.gif",
          "https://aniyuki.com/wp-content/uploads/2022/06/anime-hugs-aniyuki-42.gif",
          "https://aniyuki.com/wp-content/uploads/2022/06/anime-hugs-aniyuki-45.gif",
          "https://media.tenor.com/kCZjTqCKiggAAAAC/hug.gif",
          "https://media.tenor.com/YuwEoQvncPgAAAAC/hug.gif",
          "https://media.tenor.com/wUQH5CF2DJ4AAAAC/horimiya-hug-anime.gif",
          "https://media.tenor.com/KHUhRSyp03EAAAAC/miss-you.gif"];

function getRandomImageLink() {
  return imageLinks[Math.floor(Math.random() * imageLinks.length)];
}
async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  const animeQuestions = ["بين أحضانكَ يا حبيبي يلفّ الدفء، وتعلو الحنان، وتمتزج النفوس، يا من تغمر بالعطف والمودّة، إنك العزيز على قلب الصديق الحبيب.",
                         "بين أذرعك يتسابق الزمان، وتطوف السعادة كالدوامة حولك، فأنت الحبيب الذي ينثر الأمل، ويشعر الصديق بالطمأنينة والحنان.",
                         "معك تتعالى الأفراح، وترقص النفوس، وتشرق الشمس بكل جمالها، فأنت الصديق الذي يغمر الحب والعطف، ويشعر الحبيب بالسعادة والأمان.",
                         "بين أحضانك يتلاطم الدفء، وينساب الحنان كالنهر الجاري، يا من تحمل في قلبك الحب والصدق، إنك الحبيب الذي يشعر الصديق بالأمان والدفء."];
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
      body: `💕${senderName}💕!!!!\n${question}🙈`,
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
