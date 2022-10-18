"use strict";
require("dotenv").config();

module.exports = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_BOT_MANUALBOOK_FILE_ID: process.env.TELEGRAM_BOT_MANUALBOOK_FILE_ID,
  API_URL: process.env.API_URL,
};
