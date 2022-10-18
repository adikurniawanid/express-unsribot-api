const telegramBotConfig = require("../src/config/telegramBot.config");
const TelegramBot = require("node-telegram-bot-api");
const { default: axios } = require("axios");
const XLSX = require("xlsx");

const bot = new TelegramBot(telegramBotConfig.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_to_message_id: msg.message_id,
  };

  try {
    if (msg.text === "/start") {
      bot.sendMessage(
        chatId,
        `Halo @${msg.from.username}, selamat datang di @nl2sql_bot!

Cara penggunaan bot dapat dilihat pada perintah /help.
Untuk mengetahui lebih lanjut tentang chatbot ini dapat dilihat pada perintah /manualbook.
        `,
        opts
      );
    } else if (msg.text === "/help") {
      bot.sendMessage(
        chatId,
        `Silahkan ketikan kalimat perintah atau tanya seputar data mahasiswa, dosen, dan mata kuliah pada Sistem Informasi Akademik (SIMAK) Jurusan Teknik Informatika Universitas Sriwijaya, Bot akan menerjemahkan ke dalam bahasa Structured Query Language (SQL), dan menampilkan hasil query.
        
Contoh:
1.tampilkan data dosen pembimbing dari mahasiswa yang bernama adi kurniawan!
2.berikan data mk yang memiliki sks 3 pada semester 5!
3.siapa nama dosen yang memiliki nip 0902xxxxxx?
        `,
        opts
      );
    } else if (msg.text === "/manualbook") {
      await bot.sendDocument(
        chatId,
        "BQACAgUAAxkBAAEZHmtjTqjMvF_zh9GB2V_zG3MsspgFTAAC5wYAAt2_eFaItALTc_KG4ioE"
      );
    } else {
      const result = (
        await axios.post(telegramBotConfig.API_URL + "/nl2sql", {
          sentence: msg.text,
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

      if (resp.result.length == 1) {
        bot.sendMessage(
          chatId,
          JSON.stringify(resp.result[0], null, "･").replace(/[{"}]/g, "")
        );
      } else if (resp.result.length > 1) {
        await bot.sendDocument(chatId, "data.xlsx");
      } else {
        bot.sendMessage(chatId, "Data not found");
      }
    }
  } catch (error) {
    console.log(error);
    if (error?.response?.status) {
      bot.sendMessage(chatId, error.response.data.message, opts);
    } else if (error?.code === "ECONNREFUSED") {
      bot.sendMessage(chatId, "Internal Server Error, API is down", opts);
    } else {
      bot.sendMessage(chatId, error);
    }
  }
});
