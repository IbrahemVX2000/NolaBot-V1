const langData = {
    "en_US": {
        "noResult": "Nino doesn't understand what you're saying :("
    },
    "vi_VN": {
        "noResult": "Nino không hiểu bạn đang nói gì :("
    },
    "ar_SY": {
        "noResult": "شتريييييييد"
    }
}

const onLoad = () => {
    if (!global.hasOwnProperty("ninoauto")) global.ninoauto = {};
}

const _3Sec = 3000;

const onCall = async ({ message, getLang, data }) => {
    const { senderID, threadID } = message;

    if (senderID == global.botID) return;
    if (!global.nino.hasOwnProperty(threadID) && !global.nino[threadID]) return;
    if (message.body.startsWith(`${data?.thread?.data?.prefix || global.config.PREFIX}nino off`)) return;

    if (!global.ninoauto.hasOwnProperty(message.threadID)) global.ninoauto[threadID] = {};
    if (!global.ninoauto[threadID].hasOwnProperty(senderID)) global.ninoauto[threadID][senderID] = 0;

    if (global.ninoauto[threadID][senderID] + _3Sec > Date.now()) return;
    global.ninoauto[threadID][senderID] = Date.now();
 
  const thetexts =["همم ما فهمت",
                   "اها ما فهمت",
                   "اووووه\nما فهمت",
                   "اوك"]
const randomIndex = Math.floor(Math.random() * thetexts.length);
        const texts = thetexts[randomIndex];
  
    var response = await global.GET(`https://api.simsimi.net/v2/?text=${encodeURIComponent(message.body)}&lc=ar`);
    var data = response.data.success;
  if (data == "لا أدري ماذا تقول ، من فضلك. أرجوك علمني") {data = texts}
    message.reply({body: data});
}


export default {
    onLoad,
    langData,
    onCall
}
