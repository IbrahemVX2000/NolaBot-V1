import moment from 'moment-timezone';
import handleEvents from './events.js';
import { handleDatabase } from './database.js';


export default async function handleListen() {
    const { handleCommand, handleReaction, handleMessage, handleReply, handleUnsend, handleEvent } = await handleEvents();
    const eventlog_excluded = ["typ", "presence", "read_receipt"];
    const logger = global.modules.get('logger');

    function handleEventLog(event) {
        const { LOG_LEVEL, timezone } = global.config;

        if (LOG_LEVEL == 0) return;
        if (eventlog_excluded.includes(event.type)) return;
        const { type, threadID, body, senderID } = event;
        if (LOG_LEVEL == 1) {
            let time = moment().tz(timezone).format('YYYY-MM-DD_HH:mm:ss');

            if (type == 'message' || type == 'message_reply') {
                logger.custom(`${threadID} • ${senderID} • ${body ? body : 'Photo, video, sticker, etc.'}`, `${time}`);
            }
        } else if (LOG_LEVEL == 2) {
            console.log(event);
        }

        return;
    }

    return async (err, event) => {
        if (global.maintain && !global.config.MODERATORS.some(e => e == event.senderID || e == event.userID)) return;
        handleEventLog(event); 
      if(event.isGroup == true){ 
      const { Threads } = global.controllers;
      const getThread = await Threads.get(event.threadID);
      const threadWorks= getThread.info.restriction;
        const isGroupAdmin = getThread.info.adminIDs.some(e => e === event.senderID || e === event.userID);
        const hasAbsolutesPermission = global.config.ABSOLUTES.some(e => e === event.senderID || e === event.userID);
      if (threadWorks && !(isGroupAdmin || hasAbsolutesPermission ) ) return;}
      
        if (global.config.ALLOW_INBOX !== true && !global.config.ABSOLUTES.some(e => e == event.senderID || e == event.userID)) return;

      async function unsendWithEmoji(event){
        if(event.reaction === "👍" && event.senderID == global.botID){
          const { Threads } = global.controllers;
          const getThread = await Threads.get(event.threadID);
          const isAllowed = getThread?.data?.unsend === true;
          if(!isAllowed && !global.config.ABSOLUTES.some(e => e == event.senderID || e == event.userID) ){return}
          global.api.unsendMessage(event.messageID);
        }
      }
        (async () => {
            if (!eventlog_excluded.includes(event.type)) {
                await handleDatabase({ ...event });
            }
            switch (event.type) {
                case "message":
                case "message_reply":
                    handleMessage({ ...event });
                    handleReply({ ...event });
                    handleCommand({ ...event });
                    break;
                case "message_reaction":
                    unsendWithEmoji(event);
                    handleReaction({ ...event });
                    break;
                case "message_unsend":
                    handleUnsend({ ...event });
                    break;
                case "event":
                case "change_thread_image":
                    handleEvent({ ...event });
                    break;
                case "typ":
                    break;
                case "presence":
                    break;
                case "read_receipt":
                    break;
                default:
                    break;
            }
        })();
    }
}
