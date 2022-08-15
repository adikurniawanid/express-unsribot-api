const telegramBotConfig = require("../src/config/telegramBot.config");
const TelegramBot = require("node-telegram-bot-api");
const { default: axios } = require("axios");

const bot = new TelegramBot(telegramBotConfig.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

bot.onText(/\/nl2sql (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  try {
    const resp = (
      await axios.post(telegramBotConfig.API_URL + "/nl2sql", {
        sentence: match[1],
      })
    ).data.data;

    bot
      .sendMessage(chatId, JSON.stringify(resp, null, 2), {
        reply_to_message_id: msg.message_id,
      })
      .catch((e) =>
        bot.sendMessage(chatId, "Bad Request: reply message is too long")
      );
  } catch (error) {
    if (error.response.data.message) {
      bot.sendMessage(chatId, error.response.data.message);
    }
  }
});

bot.onText(/\/querySingle (.+)/, async (msg, match) => {
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
      sql: result.translator,
      result: result.resultQuery,
    };

    await bot.sendMessage(chatId, resp.sql, opts);
    await bot.sendMessage(chatId, "Jumlah data : " + resp.result.length, opts);

    resp.result.map((element) => {
      bot
        .sendMessage(
          chatId,
          JSON.stringify(element, null, 1).replace(/[{}]/g, ""),
          opts
        )
        .catch((e) =>
          bot.sendMessage(chatId, "Bad Request: reply message is too long")
        );
    });
  } catch (error) {
    if (error.response.data.message) {
      bot.sendMessage(chatId, error.response.data.message);
    }
  }
});
