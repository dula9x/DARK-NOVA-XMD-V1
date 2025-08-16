const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "7CJwBDyQ#y0avic_VElgTpQI-tWcdlp6ZYOu6PhJjKMWeSijK2-I",
  MONGODB: process.env.MONGODB || "mongodb://mongo:pzpFHALBVOXYCqDKIKorAcqvlJBabaOH@crossover.proxy.rlwy.net:26835",
  OWNER_NUM: process.env.OWNER_NUM || "94752978237 / 94770349867",
};
