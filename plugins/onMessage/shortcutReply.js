async function onCall({ message, getLang, data }) {
  const { type, mentions, messageReply, senderID, threadID, body } = message; 
  const { Threads, Users } = global.controllers;
  const getThread = await Threads.get(threadID);
  let threadShortcut = getThread?.info?.shortcut || {}; 
  for (const key in threadShortcut) {
    if (key === body) {
      const value = threadShortcut[key];
      message.reply(value);
      break;
    }
  }
  return;
}

export default {
  onCall,
};
