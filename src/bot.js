const telegramBotConfig = require("../src/config/telegramBot.config");
const TelegramBot = require("node-telegram-bot-api");
const { default: axios } = require("axios");

const bot = new TelegramBot(telegramBotConfig.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

bot.onText(/\/nl2sql (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_to_message_id: msg.message_id,
  };

  try {
    const result = (
      await axios.post(telegramBotConfig.API_URL + "/nl2sql", {
        sentence: match[1],
      })
    ).data.data;

    const resp = {
      sql: result.translate,
      result: result.query,
    };

    await bot.sendMessage(chatId, resp.sql, opts);
    await bot.sendMessage(chatId, "Jumlah data : " + resp.result.length);

    if (resp.result.length > 0) {
      resp.result.map((element) => {
        bot
          .sendMessage(
            chatId,
            JSON.stringify(element, null, 1).replace(/[{}]/g, "")
          )
          .catch((e) =>
            bot.sendMessage(chatId, "Bad Request: reply message is too long")
          );
      });
    } else {
      bot.sendMessage(chatId, "Data not found");
    }
  } catch (error) {
    console.log(error);
    if (error.response.data.message) {
      bot.sendMessage(chatId, error.response.data.message);
    } else {
      bot.sendMessage(chatId, error);
    }
  }
});
