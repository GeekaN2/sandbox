const axios = require('axios');

const botUrl = process.env.TELEGRAM_BOT_URI;

/**
 * Send a message to telegram via notify-codex-bot
 *
 * @param {string} message - message to send
 */
async function sendMessage(message) {
  if (!botUrl) {
    return;
  }
  console.log('kek');
  const resp = await axios.post(botUrl, `message=${message}&parse_mode=HTML`);
  console.log(resp.data,  `message=${message}&parse_mode=HTML`);
}

module.exports = {
  sendMessage,
};