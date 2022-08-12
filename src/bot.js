const telegramBotConfig = require("../src/config/telegramBot.config");
const TelegramBot = require("node-telegram-bot-api");
const { default: axios } = require("axios");

const bot = new TelegramBot(telegramBotConfig.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

bot.onText(/\/pre (.+)/, async (msg, match) => {
  try {
    const chatId = msg.chat.id;

    const resp = (
      await axios.post(telegramBotConfig.API_URL + "/nl2sql", {
        setence: match[1],
      })
    ).data.data.preprocessing;

    bot.sendMessage(chatId, JSON.stringify(resp), {
      reply_to_message_id: msg.message_id,
    });
  } catch (error) {
    bot.sendMessage(chatId, error.response.data.message);
  }
});

bot.onText(/\/parser (.+)/, async (msg, match) => {
  try {
    const chatId = msg.chat.id;

    const resp = (
      await axios.post(telegramBotConfig.API_URL + "/nl2sql", {
        setence: match[1],
      })
    ).data.data.parser;

    bot.sendMessage(chatId, JSON.stringify(resp, null, 2), {
      reply_to_message_id: msg.message_id,
    });
  } catch (error) {
    bot.sendMessage(chatId, error.response.data.message);
  }
});

bot.onText(/\/nl2sql (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;

  try {
    const resp = (
      await axios.post(telegramBotConfig.API_URL + "/nl2sql", {
        setence: match[1],
      })
    ).data.data.translator;
    bot.sendMessage(chatId, resp, {
      reply_to_message_id: msg.message_id,
    });
  } catch (error) {
    bot.sendMessage(chatId, error.response.data.message);
  }
});

bot.onText(/\/detail (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;

  try {
    const resp = (
      await axios.post(telegramBotConfig.API_URL + "/nl2sql", {
        setence: match[1],
      })
    ).data.data;

    bot.sendMessage(chatId, JSON.stringify(resp, null, 2), {
      reply_to_message_id: msg.message_id,
    });
  } catch (error) {
    bot.sendMessage(chatId, error.response.data.message);
  }
});

bot.onText(/\/query (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;

  try {
    const result = (
      await axios.post(telegramBotConfig.API_URL + "/nl2sql", {
        setence: match[1],
      })
    ).data.data;

    const resp = result.resultQuery;

    bot.sendMessage(chatId, JSON.stringify(resp, null, 2), {
      reply_to_message_id: msg.message_id,
    });
  } catch (error) {
    bot.sendMessage(chatId, error.response.data.message);
  }
});

bot.onText(/\/querySendOne (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;

  try {
    const result = (
      await axios.post(telegramBotConfig.API_URL + "/nl2sql", {
        setence: match[1],
      })
    ).data.data;

    const resp = {
      sql: result.translator,
      result: result.resultQuery,
    };

    await bot.sendMessage(chatId, resp.sql);
    for (let index = 0; index < resp.result.length; index++) {
      bot.sendMessage(chatId, JSON.stringify(resp.result[index], null, 2));
    }
  } catch (error) {
    bot.sendMessage(chatId, error.response.data.message);
  }
});
