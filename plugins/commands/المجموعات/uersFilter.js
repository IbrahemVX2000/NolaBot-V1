
const config = {
    name: "تصفية",
    aliases: ["تصفيه"],
    description: "تصفيه المجموعة من الحسابات المحظورة",
    usage: "",
    cooldown: 3,
    permissions: [ 1, 2],
    isAbsolute: false,
    isHidden: false,
    credits: "IbrahemVX2000",
    
}


function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  if (!message.isGroup) return;
 const { type, mentions, messageReply, senderID,threadID } = message;
  const { Threads, Users } = global.controllers;
  const getThread = await Threads.get(message.threadID);
  if (!getThread.info.adminIDs.includes(global.botID)){ 
			return message.reply("يجب ان يكون البوت ادمن للقيام بهذه العملية");}
  let result = await global.controllers.Threads.getInfoAPI(message.threadID);
  const warn = await message.reply("سيتم طرد الحسابات المحظورة.\nيرجى التفاعل ب❤ لاكمال الاجراء");
  let obj={
    threadInfo:getThread,
    adminID:message.senderID
  }
  warn.addReactEvent({callback:onReply,obj});

}
 async function onReply({message,eventData}){
   const log=await global.modules.get("logger");
   try{ 
   const { Users } = global.controllers;
   const { reaction } = message;
    if (reaction != "❤" ) return;
   const { type, mentions, messageReply, senderID,threadID } = message;
   const { Threads } =global.controllers;
   const threadInfo = await Threads.get(message.threadID);
   // const {threadInfo}=eventData;
   // return console.log(threadInfo?.info?.members);
   const membersBlocked = threadInfo?.info?.members?.map(user => user.userID);
   const errors = [];
	 const success = [];
   for (const user of membersBlocked) {
				if (Users.getInfo(user)?.info?.type =="UnavailableMessagingActor" && !threadInfo?.info?.adminIDs?.some(id => id == Users.getInfo(user)?.info?.id)) {
					try {
						await api.removeUserFromGroup(user, threadID);
						success.push(Users.getInfo(user)?.info?.id);
					}
					catch (e) {
           await log.custom(e.error,"ERROR","error");
						errors.push(Users.getInfo(user)?.info?.name);
					}
					await sleep(10);
				}
			}

   let msg = "";
   if (success.length > 0){ 
				msg += `تم طرد ${success.length} حساب لكونها محظورة`;}
			if (errors.length > 0){ 
				msg +=  `فشل طرد الاعضاء التاليين: ${errors.join("\n")}\n\nفشل طرد ${success.length} من الاعضاء.`;}
			if (msg == ""){ 
				msg += "لا توجد حسابات محظورة لطردها";}
			await message.send(msg);
   } catch(e){ 
     log.custom(e,"ERROR","error");
 }
 }
export default {
    config,
    onCall
}
