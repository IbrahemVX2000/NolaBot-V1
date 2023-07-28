import axios from "axios";
async function onCall({ message, getLang, data }) {
  try{ 
    const { senderID, messageID, threadID } = message;
  if(message.body.endsWith("؟؟") || message.body.endsWith("??") || message.body.endsWith("!")){
    message.react("⚙");
    let result = await GPT(message.body);
    if(result.includes("GPTGO") || result.includes("OpenAI")){
      const textExtra = ["انا نولا روبوت ماسنجر تم تطويره من قبل ابراهيم الحربي لازالت قيد التعلم والتطوير لكني اتمنى ان اكون مفيدا.",
                   "مرحبا,اسمي نولا انا روبوت مصمما للمساعدة في مختلف المجالات تم تطويري من قبل ابراهيم الحربي على منصة ماسنجر لاكون مساعدا للناس.",
                   "مرحبًا، أنا نولا، روبوت ماسنجر تم تطويره من قبل ابراهيم الحربي. أنا ما زلت قيد التعلم والتطوير، ولكنني أتطلع دائمًا لأن أكون مفيدًا لكم.",
                   "مرحبًا، أنا نولا، الروبوت المصمم لمساعدتكم في مختلف المجالات. تم تطويري على منصة ماسنجر بواسطة ابراهيم الحربي لأكون مساعدًا فعالًا لكافة الناس.",
                   "أهلاً، اسمي نولا، روبوت ماسنجر مطور بواسطة ابراهيم الحربي. لا زلت في مرحلة التطوير والتعلم، ولكنني آمل أن أكون أداة مفيدة لكم في المستقبل.",
                   "أنا نولا، روبوت ماسنجر مبني بذكاء صناعي، وتم تطويري من قبل ابراهيم الحربي. أعمل باستمرار على تحسين نفسي لأكون مساعدًا فعالًا ومفيدًا للجميع.",
                   ];
      const txtExtra= textExtra[Math.floor(Math.random() * textExtra.length)];
      result = txtExtra;
    }
    else if(result.includes("GPT-GO") || result.includes("GPT") || result.includes("Assistant")){
      const textExtra = ["انا نولا , وانا نظام ذكاء اصطناعي يعمل على توفير اجابات ومعلومات مفيدة للمستخدمين."];
      const txtExtra= textExtra[Math.floor(Math.random() * textExtra.length)];
      result = txtExtra;
    }
    message.react("✔");
    await message.reply(result);
  }
  } catch (e){
    console.log(e);
    message.react("❌");
  }
}

async function GPT(prompt) {
    const { data } = await axios.get(`https://gptgo.ai/?q=${encodeURIComponent(prompt)}&hl=vi&hlgpt=ar#gsc.tab=0&gsc.q=${encodeURIComponent(prompt)}&gsc.page=1`);
    const token = data.split('renderUI("')[1].split('")')[0];
    const { data: resp } = await axios.get(`https://gptgo.ai/action_ai_gpt.php?token=${token}`);
    const content = resp.split("\n")
      .filter(line => line.includes("content"))
      .map(line => JSON.parse(line.split('data: ')[1]).choices[0].delta.content)
      .join("");
    return content.split("[DONE]")[0];
  }
export default {
    onCall
}
