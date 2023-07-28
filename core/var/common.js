import fs from 'fs';
import axios from 'axios';
import canvas from 'canvas';
import FormData from 'form-data';
import { randomInt } from 'crypto';
import { join } from 'path';
import path from "path";
import chalk from 'chalk';
import moment from "moment-timezone";
import imageDo from "image-downloader";
import AES from 'crypto-js/aes.js';
import encUtf8 from 'crypto-js/enc-utf8.js';
function request(url, options = {}, callback = null) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    if (typeof callback !== 'function') {
        callback = () => { };
    }
    axios(url, options)
        .then(response => {
            callback(null, response, response.data);
        })
        .catch(error => {
            callback(error);
        });
}


const GET = axios.get;


/**
 * 
 * @param {string} input - a stringified JSON object or a path to a JSON file
 * @returns {boolean}
 */
function isJSON(input) {
    try {
        JSON.parse(input);
        return true;
    } catch (e) {
        if (isExists(input)) {
            return isJSON(fs.readFileSync(input, 'utf8'));
        } else {
            return false;
        }
    }
}


function fileStats(path) {
    try {
        return fs.statSync(path);
    } catch (e) {
        throw e;
    }
}

/**
 * Checks if a file/directory exists
 * @param {string} path - a path to a file/directory
 * @param {string} type - "file" or "dir"
 * @returns {boolean}
 */
function isExists(path, type = 'file') {
    try {
        const result = fs.statSync(path);
        return type === 'file' ? result.isFile() : result.isDirectory();
    } catch (e) {
        return false;
    }
}

function reader(path) {
    return fs.createReadStream(path);
}

function writer(path) {
    return fs.createWriteStream(path);
}

function writeFile(path, data, encoding = 'utf8') {
    return fs.writeFileSync(path, data, encoding);
}

function readFile(path, encoding = 'utf8') {
    return fs.readFileSync(path, encoding);
}

function createDir(path) {
    return fs.mkdirSync(path, { recursive: true });
}

/** 
 * Download a file from an url which could be video, audio, json, etc.
 * 
 * @param {string} path - a path to a file
 * @param {string} url - an url to a file
 * @returns {string} path
 */
function downloadFile(path, url) {
    return new Promise((resolve, reject) => {
        GET(url, { responseType: 'stream' })
            .then(res => {
                const _writer = writer(path);

                res.data.pipe(_writer);

                _writer.on('error', (err) => {
                    reject(err);
                })
                _writer.on('close', () => {
                    resolve(path);
                })
            })
            .catch(err => {
                reject(err);
            });
    });
}


function deleteFile(path) {
    return fs.unlinkSync(path);
}


function scanDir(path) {
    return fs.readdirSync(path);
}


function getStream(input) {
    return new Promise((resolve, reject) => {
        if (isExists(input)) {
            resolve(reader(input));
        } else {
            if (isURL(input)) {
                GET(input, { responseType: 'stream' })
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } else {
                reject(new Error('Invalid input'));
            }
        }
    })
}

function getBase64(input) {
    return new Promise((resolve, reject) => {
        if (isURL(input)) {
            GET(input, { responseType: "text", responseEncoding: "base64" })
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err);
                });
        } else {
            reject(new Error('Invalid input'));
        }
    });
}


function isURL(url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url);
}


function random(min, max) {
    min = parseInt(min);
    max = parseInt(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Circle an image
 */
function circle(image, x, y, radius) {
    const tempCanvas = new canvas.createCanvas(image.width, image.height);
    const ctx = tempCanvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(image, 0, 0);

    return tempCanvas;
}


function sleep(ms) {
    const date = Date.now();
    while (Date.now() - date < ms) { };
}


/**
 * for loop minified
 * @param {number} times 
 * @param {function} callback 
 * 
 * @example
 *      // console.log from 0 to 99
 *      loop(100, i => console.log(i));
 */
function loop(times, callback = () => { }) {
    if (times && !isNaN(times) && times > 0) {
        for (let i = 0; i < times; i++) {
            callback(i);
        }
    }
}


function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    loop(6, () => {
        color += letters[Math.floor(Math.random() * letters.length)];
    })
    return color;
}


function getRandomPassword(length = 8, specialChars = false) {
    const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' + (specialChars ? '!@#$%^&*()_+~`|}{[]\:;?><,./-=' : '');
    let password = '';
    loop(length, () => {
        password += letters[randomInt(0, letters.length)];
    })
    return password;
}


function addCommas(x) {
    if (x === null) return null;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


/**
 * convert a base64
 * @param {String} file - Path to a file 
 */
function saveToBase64(file) {
    let bitmap = fs.readFileSync(file);
    return Buffer.from(bitmap).toString('base64');
}


/**
 * reverse from Base64
 * @param {String} base64 - Base64 string
 */
function saveFromBase64(path, base64) {
    return new Promise((resolve, reject) => {
        const bitmap = Buffer.from(base64, 'base64');
        const _writer = writer(path);

        _writer.write(bitmap, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(path);
            }

            _writer.destroy();
        });
    })
}

async function uploadImgbb(base64) {
    try {
        const form = new FormData();
        form.append('key', process.env.IMGBB_KEY);
        form.append('image', base64);

        const config = {
            method: 'post',
            url: 'https://api.imgbb.com/1/upload',
            headers: {
                ...form.getHeaders()
            },
            data: form
        };

        const res = await axios(config);
        return res?.data?.data?.url;
    } catch (err) {
        throw err;
    }
}


function msToHMS(ms) {
    let seconds = parseInt((ms / 1000) % 60)
        , minutes = parseInt((ms / (1000 * 60)) % 60)
        , hours = parseInt((ms / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
}

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function expToLevel(exp) {
    return Math.floor(Math.pow(exp || 1, 1 / 3));
}

function levelToExp(level) {
    return Math.floor(Math.pow(level, 3));
}

function getAvatarURL(uid) {
    return `https://graph.facebook.com/${uid}/picture?type=large&width=500&height=500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`
}

function upload(url) {
  return new Promise((resolve) => {
    global.request(
      `${global.nola_api.main}/imgbb`,
      {
        method: "POST",
        data: {
          url: url,
        },
      },
      async (error, res, data) => {
        if (error) {
          console.error(error);
          return resolve(null);
        }
        return resolve(data.url);
      }
    );
  });
}


async function translate(text, sourceLang, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await global.GET(url);
  const translation = res.data[0].map((item) => item[0]).join("");
  return translation;
}

async function streamURL(url) {
  const dest = join(`${global.cachePath}/${Date.now()}1.png`);
  if (isURL(url)) {
    await downloadFile(dest, url);
  } else {
    await saveFromBase64(dest, url);
  }
  setTimeout(j => fs.unlinkSync(j), 60 * 1000, dest);
  return fs.createReadStream(dest);
};

async function getImgUrl(file ) {
	let type = "file";
	try {
		const res_ = await axios({
			method: 'GET',
			url: 'https://imgbb.com'
		});

		const auth_token = res_.data.match(/auth_token="([^"]+)"/)[1];
		const timestamp = Date.now();

		const res = await axios({
			method: 'POST',
			url: 'https://imgbb.com/json',
			headers: {
				"content-type": "multipart/form-data"
			},
			data: {
				source: file,
				type: type,
				action: 'upload',
				timestamp: timestamp,
				auth_token: auth_token
			}
		});

		return res.data;
		
	}
	catch (err) {
		throw new CustomError(err.response ? err.response.data : err);
	}
}

async function getImgUrlByUrl(file ) {
	let type = "url";
	try {
		const res_ = await axios({
			method: 'GET',
			url: 'https://imgbb.com'
		});

		const auth_token = res_.data.match(/auth_token="([^"]+)"/)[1];
		const timestamp = Date.now();

		const res = await axios({
			method: 'POST',
			url: 'https://imgbb.com/json',
			headers: {
				"content-type": "multipart/form-data"
			},
			data: {
				source: file,
				type: type,
				action: 'upload',
				timestamp: timestamp,
				auth_token: auth_token
			}
		});

		return res.data;
		
	}
	catch (err) {
		throw new CustomError(err.response ? err.response.data : err);
	}
}

async function share(stream) {
  const formData = new FormData();
  formData.append('file', stream);

  const res = await axios.post('https://api.zippysha.re/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  const fullUrl = res.data.data.file.url.full;
  return fullUrl;
  // const res_ = await axios.get(fullUrl, {
  //   headers: {
  //     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43"
  //   }
  // });

  // const downloadUrl = res_.data.match(/id="download-url"(?:.|\n)*?href="(.+?)"/)[1];
  // res.data.data.file.url.download = downloadUrl;

  // return res.data;
}

async function timeNow(location){
let loc =location;
  if(!loc){
    loc ="Asia/Riyadh";
  }
  const currentTime = moment().tz(loc).format("hh:mm A");
    const currentDate = moment().tz(loc).format("YYYY-MM-DD");
  let time={
    date: currentDate,
    time: currentTime
  };
  return time;
}

async function userData(id){
  const { Users } = global.controllers;
  const userInfo = await Users.getInfo(id);
  const userName = userInfo.name;
  const userGender = userInfo.gender;
  const userProfile = userInfo.profileUrl;
  const userPicture = await global.getAvatarURL(id) ||null;
  const userStreamedImage = await global.streamURL(userPicture);
  const data ={
    name: userName,
    gender: userGender,
    profile: userProfile,
    image: userStreamedImage,
    pic: userPicture
  }
  return data;
}

async function ImageDown(url, pathPar){
    if(!url){return}
      let inputPath = pathPar;
  if(!inputPath){ 
       inputPath = path.resolve(`${global.cachePath}/102402.jpg`);
  }
      await imageDo.image({
        url: url,
        dest: inputPath,
      });
      
      const image= fs.createReadStream(inputPath);
   // setTimeout(j => fs.unlinkSync(j), 60 * 1000, inputPath);
  return image;
}

 async function updateInfo(tid, data) {
       let DATABASE = "JSON";
        if (!tid || !data || typeof data !== "object" || Array.isArray(data)) return false;
        tid = String(tid);
        if (data?.hasOwnProperty("imageSrc")) {
            if (data.imageSrc) {
                data.imageSrc = await saveImg(data.imageSrc);
            }
        }
        var threadData = global.data.threads.get(tid) || null;

        data.members = threadData?.info?.members || [];
        if (data?.participantIDs) for (const participantID of data.participantIDs) {
            if (!data.members.some(e => e.userID == participantID)) {
                data.members.push({
                    userID: participantID
                });
            }
        }

        let invalidIDs = [];
        for (const mem of data.members) {
            if (data.participantIDs && !data.participantIDs.includes(mem.userID)) {
                invalidIDs.push(mem.userID);
            }
        }

        if (invalidIDs.length > 0) {
            data.members = data.members.filter(e => !invalidIDs.includes(e.userID));
        }

        delete data.participantIDs;
        delete data.threadName;
        if (data.members.length == 0) delete data.members;
        if (threadData !== null) {
            Object.assign(threadData.info, data);
            global.data.threads.set(tid, threadData);

            if (DATABASE === 'JSON' || DATABASE === 'MONGO') {
                return true;
            }
        } else return create(tid, data);
    }


async function searchSafebooruImages(tags) {
  function getImageUrl(directory, image) {
    return `https://safebooru.org/images/${directory}/${image}`;
}
    try {
        const data = await global
            .GET(
                `https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&limit=100&tags=${encodeURIComponent(
                    tags
                )}`
            )
            .then((r) => r.data)
            .catch((err) => {
                console.log(err);
                return null;
            });

        if (data.length === 0 || data === null)
            return;

        const filteredData = data.filter(
            (e) =>
                e.image.endsWith(".jpg") ||
                e.image.endsWith(".png") ||
                e.image.endsWith(".jpeg")
        );

        if (filteredData.length === 0)
            return;

        global.shuffleArray(filteredData);

        const imgStreams = [];

        for (let i = 0; i < Math.min(9, filteredData.length); i++) {
            const img = filteredData[i];
            imgStreams.push(
                await global.getStream(getImageUrl(img.directory, img.image))
            );
        }

        return imgStreams;
    } catch (e) {
        console.error(e);
        throw new Error(
            "حدث خطأ"
        );
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


async function shorURL(url) {
	try {
		const result = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
		return result.data;
	}
	catch (err) {
		let error;
		if (err.response) {
			error = new Error();
			Object.assign(error, err.response.data);
		}
		else
			error = new Error(err.message);
	}
}

async function customLog(message,type,co){
  try{ 
    const log=await global.modules.get("logger");
    if(!message || !type){
      return log.custom("message && type paramters are required for consoling the message","WARN ERROR","error")
    }
    if(co){ 
      log.custom(message,type,co);
    } else {
      log.custom(message,type);
    }
  } catch(e){
    log.custom(e,"ERROR","error");
  }
}

async function boldTxt(txt){
  try{ 
  if(!txt){
    return customLog("needed txt to blod it","ERROR","error")
  }
 const blodtxt = chalk.bold;
  return blodtxt(txt);
}catch(e){
    await customLog(e,"ERROR","error");
    return "error";
  }
}

function encrypt(obj, secretKey) {
    const encrypted = AES.encrypt(JSON.stringify(obj), secretKey).toString();
    return encrypted;
}

function decrypt(encryptedObj, secretKey) {
    const decrypted = AES.decrypt(encryptedObj, secretKey).toString(encUtf8);
    return JSON.parse(decrypted);
}

export default {
  decrypt,
  encrypt,
  boldTxt,
  customLog,
  shorURL,
  GPT,
  searchSafebooruImages,
  updateInfo,
  ImageDown,
  userData,
  timeNow,
  getImgUrlByUrl,
  share,
  getImgUrl,
  streamURL,
  translate,
    request,
    upload,
    GET,
    isJSON,
    fileStats,
    isExists,
    reader,
    writer,
    readFile,
    writeFile,
    createDir,
    downloadFile,
    deleteFile,
    scanDir,
    getStream,
    getBase64,
    isURL,
    random,
    circle,
    sleep,
    loop,
    getRandomHexColor,
    getRandomPassword,
    addCommas,
    saveToBase64,
    saveFromBase64,
    uploadImgbb,
    msToHMS,
    shuffleArray,
    expToLevel,
    levelToExp,
    getAvatarURL
};
