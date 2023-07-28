
async function onCall({ message, getLang, data }) {
    const { senderID, messageID, threadID } = message;
  const { Users,Threads } = global.controllers;
  const getUsersInfo=await Threads.getInfo(message.threadID);

  
    api.markAsReadAll(() => {});
    return;
}

export default {
    onCall
}
