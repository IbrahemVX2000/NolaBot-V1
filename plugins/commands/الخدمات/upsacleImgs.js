import axios from "axios";
import fs from "fs-extra";
import AbortController from "abort-controller";

const config = {
  name: "رفع",
  aliases: ["ارفعي"],
  description: "رفع جودة الصور",
  usage: "رد",
  cooldown: 10,
  permissions: [0, 1, 2],
  isAbsolute: false,
  isHidden: false,
  credits: "IbrahemVX2000",
};

const supportedType = ["photo", "animated_image"];

async function upload(url) {
  try {
    const response = await axios.post(`${global.nola_api.main}/imgbb`, {
      url: url,
    });
    return response.data.url;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function Upload(url) {
  try {
    const Response = await axios.post(`${global.nola_api.main}/imgbb`, {
      url: url,
    });
    return Response.data.url;
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  const { type, messageReply } = message;

  if (type !== "message_reply") return message.reply("يرجى عمل رد");

  const { attachments } = messageReply;

  if (!attachments || !attachments.length) return message.reply("هممم");

  const filteredAttachments = attachments.filter(attachment => supportedType.includes(attachment.type));

  if (!filteredAttachments.length) return message.reply("هذه ليست صورة");

  const urls = [];
  for (const attachment of filteredAttachments) {
    const url = await upload(attachment.url);
    if (url) {
      urls.push(url);
    }
  }

  if (!urls.length) return message.reply("فشل الرفع");

  try {
    message.react("⚙");
    const output = await midJourney(urls[0], {});
    const imagePath = "core/var/assets/drawing.jpg";
    await downloadImage(output, imagePath);
    const url2 = await Upload(output);
    const url3 = url2.toString();
    const stream = fs.createReadStream(imagePath);
    message.react("✔");
    message.reply({body:`تفضل هذه الصورة ورابط لها^^\n\n${url3}` , attachment: stream });
  } catch (err) {
    console.error(err);
    message.reply("فشلت العملية بنجاح");
  }
}

async function downloadImage(url, filePath) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(fs.createWriteStream(filePath));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => resolve());
    response.data.on("error", (error) => reject(error));
  });
}

const ReplicateUtils = {
  async run(model, inputs) {
    let prediction;
    try {
      prediction = await this.create(model, inputs);
    } catch (e) {
      throw e.response.data;
    }
    while (!["canceled", "succeeded", "failed"].includes(prediction.status)) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      prediction = await this.get(prediction);
    }
    return prediction.output;
  },

  async get(prediction) {
    if (prediction.prediction) {
      return prediction.prediction;
    }
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 29000);
    const response = await axios
      .get(
        `https://replicate.com/api/models${prediction.version.model.absolute_url}/versions/${prediction.version_id}/predictions/${prediction.uuid}`,
        {
          signal: controller.signal,
        }
      )
      .then((r) => r.data);
    clearTimeout(id);
    return response;
  },

  create(model, inputs) {
    const [path, version] = model.split(":");
    const data = {
      inputs: {
        image: inputs.prompt, 
      },
    };
    return axios({
      url: `https://replicate.com/api/models/${path}/versions/${version}/predictions`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    }).then((response) => response.data);
  },
};

const model = "mv-lab/swin2sr:a01b0512004918ca55d02e554914a9eca63909fa83a29ff0f115c78a7045574f";
const midJourney = async (prompt, parameters = {}) => await ReplicateUtils.run(model, { prompt, ...parameters });

export default {
  config,
  onCall,
};
