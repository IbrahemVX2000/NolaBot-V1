import chalk from 'chalk';
import gradient from 'gradient-string';

 let blue = gradient("#243aff", "#4687f0", "#5800d4");
  let fiery = gradient("#fc2803", "#fc6f03", "#fcba03");
  let red = gradient("red", "orange");
  let aqua = gradient("#0030ff", "#4e6cf2");
  let pink = gradient('purple', 'pink');
  let retro = gradient("#d94fff", "purple");
  let sunlight = gradient("#f5bd31", "#f5e131");
  let teen = gradient("#00a9c7", "#853858");
  let summer = gradient("#fcff4d", "#4de1ff");
  let flower = gradient("blue", "purple", "yellow", "#81ff6e");
  let ghost = gradient("#0a658a", "#0a7f8a", "#0db5aa");
  let hacker = chalk.hex('#4be813');
  let def = gradient("#243aff", "#4687f0", "#5800d4");
  let error = chalk.red.bold;


const logger = {
    info: (message) => {
        console.log(teen(`[INFO] ${message}`));
    },
    warn: (message) => {
        console.log(ghost(`[WARN] ${message}`));
    },
    error: (message) => {
        console.log(hacker(`[ERROR] ${message}`));
    },
    system: (message) => {
        console.log(sunlight(`[SYSTEM]`), `${message}`);
    },
    custom: (message, type,co) => {
      if(co =="blue"){
        console.log(blue(`[${type}]`), `${message}`);
      } else if(co == "fiery"){
        console.log(fiery(`[${type}]`), `${message}`);
      } else if(co == "red"){
        console.log(red(`[${type}]`), `${message}`);
      } else if(co == "aqua"){
        console.log(aqua(`[${type}]`), `${message}`);
      } else if(co == "pink"){
        console.log(pink(`[${type}]`), `${message}`);
      } else if(co == "retro"){
        console.log(retro(`[${type}]`), `${message}`);
      } else if(co == "sunlight"){
        console.log(sunlight(`[${type}]`), `${message}`);
      } else if(co == "teen"){
        console.log(teen(`[${type}]`), `${message}`);
      } else if(co == "summer"){
        console.log(summer(`[${type}]`), `${message}`);
      } else if(co == "ghost"){
        console.log(ghost(`[${type}]`), `${message}`);
      } else if(co == "hacker"){
        console.log(hacker(`[${type}]`), `${message}`);
      } else if(co == "def"){
        console.log(def(`[${type}]`), `${message}`);
      } else if(co == "error"){
        console.log(error(`[${type}]`), `${message}`);
      } else{ 
        console.log(flower(`[${type}]`), `${message}`);
      }
    },
};

export default logger;
