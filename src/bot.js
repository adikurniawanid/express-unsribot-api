const telegramBotConfig = require("../src/config/telegramBot.config");
const TelegramBot = require("node-telegram-bot-api");
const PreprocessingService = require("./api/v1/services/preprocessing.service");
const ParserService = require("./api/v1/services/parser.service");
const TranslatorService = require("./api/v1/services/translator.service");
const { sequelize } = require("./api/v1/models");

const bot = new TelegramBot(telegramBotConfig.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

bot.onText(/\/pre (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const resp = JSON.stringify(await PreprocessingService.run(match[1]));

  bot.sendMessage(chatId, resp);
});
bot.onText(/\/parser (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const resp = JSON.stringify(
    await ParserService.run(await PreprocessingService.run(match[1])),
    null,
    2
  );

  console.log("resp", resp);
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/query (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const resp = (
    await TranslatorService.run(
      await ParserService.run(await PreprocessingService.run(match[1]))
    )
  ).toString();

  console.log("resp", resp);
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/detail (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const preprocessing = await PreprocessingService.run(match[1]);
  const parser = await ParserService.run(preprocessing);
  const translator = await TranslatorService.run(parser);

  const resp = JSON.stringify(
    {
      preprocessing,
      parser,
      translator,
    },
    null,
    2
  );

  console.log("resp", resp);
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/nl2sql (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const [resp, metadata] = await sequelize.query(
    await TranslatorService.run(
      await ParserService.run(await PreprocessingService.run(match[1]))
    )
  );

  bot.sendMessage(chatId, JSON.stringify(resp, null, 2));
});
