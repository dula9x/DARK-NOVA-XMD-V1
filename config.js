const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "qTBExaJL#xwhnLEeDL9wxmnnjRfOBieCNywKUCb-jc9WwYObxDkE",
  OWNER_NUM: process.env.OWNER_NUM || "94752978237 / 94770349867",
  PREFIX: process.env.PREFIX ||"."
  ALIVE_IMG:process.env.ALIVE_IMG || "https://github.com/dula9x/DARK-NOVA-XMD-V1-WEB-PAIR/blob/main/images/WhatsApp%20Image%202025-08-15%20at%2017.22.03_c520eb7b.jpg?raw=true",
  ALIVE_MSG:process.env.ALIVE_MSG || "Iam Alive Now!! ᴅᴀʀᴋ ɴᴏᴠᴀ xᴍᴅ 🤭💗 ආහ් පැටියෝ කොහොමද ?🌝!\n\n🥶𝐌𝐚𝐝𝐞 𝐛𝐲 alpha x team🥶",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "thrue",
  MODE: process.env.MODE || "public",
};
