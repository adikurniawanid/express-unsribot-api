const telegramBotConfig = require("../src/config/telegramBot.config");
const TelegramBot = require("node-telegram-bot-api");
const { default: axios } = require("axios");
const XLSX = require("xlsx");

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

    const workSheet = XLSX.utils.json_to_sheet(resp.result);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet);

    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

    XLSX.writeFile(workBook, "data.xlsx");

    await bot.sendMessage(chatId, resp.sql, opts);

    if (resp.result.length > 0) {
      await bot.sendDocument(chatId, "data.xlsx");
    } else {
      bot.sendMessage(chatId, "Data not found");
    }
  } catch (error) {
    console.log(error);
    if (error.response.data.message) {
      bot.sendMessage(chatId, error.response.data.message, opts);
    } else {
      bot.sendMessage(chatId, error);
    }
  }
});
