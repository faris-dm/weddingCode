import QRCode from "qrcode";
import "dotenv/config";
import { v4 } from "uuid";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.Bot_Token);

bot.start(async (ctx) => {
  const chatId = ctx.chat.id;

  const eventId = v4();

  const Link = `https://frontqr.vercel.app/?event=${eventId}`;
  const qrCode = await QRCode.toDataURL(Link);
  const qrChange = Buffer.from(qrCode.split(",")[1], "base64");
  await ctx.replyWithPhoto(
    {
      source: qrChange,
    },
    {
      caption: `scan this QRcode `,
    }
  );

  bot.on("callback_query", async (ctx) => {
    const data = ctx.callbackQuery.data; // e.g. "view_12"
    const [action, videoId] = data.split("_");

    if (action === "view") {
      const video = await getVideoById(videoId);
      await ctx.replyWithVideo({ source: video.file_path });
      await updateVideoStatus(videoId, "viewed");
    }

    if (action === "dismiss") {
      await updateVideoStatus(videoId, "dismissed");
      await ctx.answerCbQuery("Dismissed");
    }

    if (action === "later") {
      await ctx.answerCbQuery("Okay, it'll stay saved for later");
    }

    await ctx.answerCbQuery(); // tells Telegram the button press was handled
  });

  console.log(`your personal id is ${chatId}`);
  console.log(`your event  id is ${eventId}`);
  console.log(`your event QRcode is:\n${Link}`);
});

export default bot;
