import express from "express";
import QRCode from "qrcode";
import "dotenv/config";
// uuid generate unique random id
import { v4 } from "uuid";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
const bot = new Telegraf(process.env.Bot_Token);

// bot.start((ctx) => {
//   ctx.reply(
//     "Welcome to the Wedding Bot! Here you can create your own personal QR code so your guests can send you video messages on your special day."
//   );
// });

bot.start(async (ctx) => {
  const chatId = ctx.chat.id;

  const eventId = v4();

  const Link = `https://yourapp.com/record?event=${eventId}`;
  const qrCode = await QRCode.toDataURL(Link);
  const qrChange = Buffer.from(qrCode.split(",")[1], "base64");
  await ctx.replyWithPhoto(
    {
      source: qrChange,
    },
    {
      caption: `you event QRcode `,
    }
  );

  console.log(`your personal id is ${chatId}`);
  console.log(`your event  id is ${eventId}`);
  console.log(`your event QRcode is:\n${Link}`);
});

bot.launch();
console.log("Bot is running...");
//  this SIGINT WILL STOP THE BOT WHEN THE  DEV CLCIK ctrl+c
process.once("SIGINT", () => bot.stop("SIGINT"));
// this SIGTERM WILL STOP THE BOT WHEN THE SERVER IS DOWN MEANS  THE HOSTING
process.once("SIGTERM", () => bot.stop("SIGTERM"));

const port = 2400;
const app = express();

app.listen(port, () => {
  console.log(`server is running in ${port}`);
});
