import express from "express";
import multer from "multer";
import cors from "cors";
import { getChatIdFromEventId, saveVideo } from "../model/db.js"
import bot from "../bot.js"

import "dotenv/config";
const app = express.Router();
app.use(express.json());


app.get("/test", (req, res) => {
  return res.status(200).send("wedding QR is working correctly");
});
// solo

//  this upload is where thes data  are sent
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 70 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("video/") && !file.mimetype.startsWith("audio/")) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
});

app.get("/event/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const chatId =  await getChatIdFromEventId(eventId);

  if (!chatId) {
    return res.status(404).json({ valid: false, message: "Event not found" });
  }

  res.json({ valid: true });
});
app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const { eventId } = req.body;
    const videoFile = req.file;

    if (!eventId || !videoFile) {
      return res.status(400).json({ success: false, message: "Missing eventId or video" });
    }

    const chatId = await getChatIdFromEventId(eventId);
    if (!chatId) {
      return res.status(404).json({ success: false, message: "Invalid event" });
    }

    const videoId = await saveVideo(eventId, videoFile.path);

    await bot.telegram.sendMessage(chatId, "🎥 You have a new video message!", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "View", callback_data: `view_${videoId}` },
            { text: "Later", callback_data: `later_${videoId}` },
            { text: "Dismiss", callback_data: `dismiss_${videoId}` },
          ],
        ],
      },
    });

    res.json({ success: true, message: "Video sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});
export default app;
