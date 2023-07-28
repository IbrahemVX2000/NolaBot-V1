import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { spawn } from 'child_process';
import axios from 'axios';

import { } from 'dotenv/config';
import logger from './core/var/modules/logger.js';
import loadPlugins from './core/var/modules/installDep.js';

import environments from './core/var/modules/environments.get.js';
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

const { isGlitch, isReplit, isGitHub } = environments;

console.clear();

// Install newer node version on some old Repls
function upNodeReplit() {
    return new Promise(resolve => {
        execSync('npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH');
        resolve();
    })
}

(async () => {
    if (process.version.slice(1).split('.')[0] < 16) {
        if (isReplit) {
            try {
                logger.warn("Installing Node.js v16 for Repl.it...");
                await upNodeReplit();
                if (process.version.slice(1).split('.')[0] < 16) throw new Error("Failed to install Node.js v16.");
            } catch (err) {
                logger.error(err);
                process.exit(0);
            }
        }
        logger.error("requires Node 16 or higher. Please update your version of Node.");
        process.exit(0);
    }

    if (isGlitch) {
        const WATCH_FILE = {
            "restart": {
                "include": [
                    "\\.json"
                ]
            },
            "throttle": 3000
        }

        if (!existsSync(process.cwd() + '/watch.json') || !statSync(process.cwd() + '/watch.json').isFile()) {
            logger.warn("Glitch environment detected. Creating watch.json...");
            writeFileSync(process.cwd() + '/watch.json', JSON.stringify(WATCH_FILE, null, 2));
            execSync('refresh');
        }
    }

    if (isGitHub) {
        logger.warn("Running on GitHub is not recommended.");
    }
})();

// Child handler
const _1_MINUTE = 60000;
let restartCount = 0;

async function main() {
console.log(fiery(`----------------------------------------------------------------`));
console.log(fiery(`| ██╗ ██████╗░ ██████╗░ ░█████╗░ ██╗░░██╗ ███████╗ ███╗░░░███╗ |`));
console.log(fiery(`| ██║ ██╔══██╗ ██╔══██╗ ██╔══██╗ ██║░░██║ ██╔════╝ ████╗░████║ |`));
console.log(fiery(`| ██║ ██████╦╝ ██████╔╝ ███████║ ███████║ █████╗░░ ██╔████╔██║ |`));
console.log(fiery(`| ██║ ██╔══██╗ ██╔══██╗ ██╔══██║ ██╔══██║ ██╔══╝░░ ██║╚██╔╝██║ |`));
console.log(fiery(`| ██║ ██████╦╝ ██║░░██║ ██║░░██║ ██║░░██║ ███████╗ ██║░╚═╝░██║ |`));
console.log(fiery(`| ╚═╝ ╚═════╝░ ╚═╝░░╚═╝ ╚═╝░░╚═╝ ╚═╝░░╚═╝ ╚══════╝ ╚═╝░░░░░╚═╝ |`));
console.log(pink(`| ██╗░░░██╗ ██╗░░██╗ ███████╗ ░█████╗░ ░█████╗░ ░█████╗░       |`));
console.log(pink(`| ██║░░░██║ ╚██╗██╔╝ ╚════██║ ██╔══██╗ ██╔══██╗ ██╔══██╗   N   |`));
console.log(pink(`| ╚██╗░██╔╝ ░╚███╔╝░ ░░███╔═╝ ██║░░██║ ██║░░██║ ██║░░██║   O   |`));
console.log(pink(`| ░╚████╔╝░ ░██╔██╗░ ██╔══╝░░ ██║░░██║ ██║░░██║ ██║░░██║   L   |`));
console.log(pink(`| ░░╚██╔╝░░ ██╔╝╚██╗ ███████╗ ╚█████╔╝ ╚█████╔╝ ╚█████╔╝   A   |`));
console.log(pink(`| ░░░╚═╝░░░ ╚═╝░░╚═╝ ╚══════╝ ░╚════╝░ ░╚════╝░ ░╚════╝░       |`));
console.log(pink(`----------------------------------------------------------------`));
    await loadPlugins();
    const child = spawn('node', ['--trace-warnings', '--experimental-import-meta-resolve', '--expose-gc', 'core/_build.js'], {
        cwd: process.cwd(),
        stdio: 'inherit',
        env: process.env
    });

    child.on("close", async (code) => {
        handleRestartCount();
        if (code !== 0 && restartCount < 5) {
            console.log();
            logger.error(`An error occurred with exit code ${code}`);
            logger.warn("Restarting...");
            await new Promise(resolve => setTimeout(resolve, 2000));
            main();
        } else {
            console.log();
            logger.error("NolaBot has stopped, press Ctrl + C to exit.");
        }
    });
};

function handleRestartCount() {
    restartCount++;
    setTimeout(() => {
        restartCount--;
    }, _1_MINUTE);
}

main();
