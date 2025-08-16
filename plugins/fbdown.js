const axios = require("axios");

module.exports = {
  pattern: "fb",
  alias: ["facebook", "fbdown"],
  desc: "Download facebook videos",
  category: "downloader",
  use: ".fb <url>",

  function: async (robin, mek, m, { args, reply }) => {
    try {
      if (!args[0]) return reply("❌ Please provide a Facebook video link.");

      let url = args[0];
      reply("⬇️ Downloading Facebook video... Please wait");

      const res = await axios.get(
        `https://api.akuari.my.id/downloader/fb?link=${url}`
      );

      if (!res.data || !res.data.respon) {
        return reply("⚠️ Failed to fetch video. Invalid link or API error.");
      }

      const videoUrl = res.data.respon[0].url;

      await robin.sendMessage(
        mek.key.remoteJid,
        {
          video: { url: videoUrl },
          caption: "✅ Here is your Facebook video",
        },
        { quoted: mek }
      );
    } catch (err) {
      console.error("[FB-DOWN ERROR]", err);
      reply("❌ Error while downloading Facebook video.");
    }
  },
};
