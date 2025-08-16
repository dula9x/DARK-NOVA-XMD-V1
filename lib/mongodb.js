const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'ALIVE_IMG', value: 'https://github.com/dula9x/DARK-NOVA-XMD-V1-WEB-PAIR/blob/main/images/%E1%B4%85%E1%B4%80%CA%80%E1%B4%8B%20%C9%B4%E1%B4%8F%E1%B4%A0%E1%B4%80%20x%E1%B4%8D%E1%B4%85.png?raw=true' },
    { key: 'ALIVE_MSG', value: 'Iam Alive Now!! ᴅᴀʀᴋ ɴᴏᴠᴀ xᴍᴅ 🤭💗 ආහ් පැටියෝ කොහොමද ?🌝!\n\n🥶𝐌𝐚𝐝𝐞 𝐛𝐲 alpha x team🥶' },
    { key: 'PREFIX', value: '.' },
    { key:'AUTO_READ_STATUS', value: 'thrue'},
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
