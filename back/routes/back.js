import express from "express";
import multer from "multer";

import { getChatIdFromEventId, saveVideo } from "../model/db.js";
import bot from "../bot.js";

import "dotenv/config";
const app = express.Router();
app.use(express.json());

app.get("/test", (req, res) => {
  return res.status(200).send("wedding QR is working correctly");
});
// solo

//  this upload is where thes data  are sent
// const upload = multer({
//   dest: "uploads/",
//   limits: { fileSize: 70 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith("video/") && !file.mimetype.startsWith("audio/")) {
//       return cb(new Error("Invalid file type"));
//     }
//     cb(null, true);
//   },
// });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 70 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    console.log("Incoming file mimetype:", file.mimetype); // ← temporary debug line

    const allowedTypes = ["video/", "audio/", "application/octet-stream"];
    const isAllowed = allowedTypes.some((type) =>
      file.mimetype.startsWith(type)
    );

    if (!isAllowed) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
});

app.get("/event/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const chatId = await getChatIdFromEventId(eventId);

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
      return res
        .status(400)
        .json({ success: false, message: "Missing eventId or video" });
    }

    const chatId = await getChatIdFromEventId(eventId);
    if (!chatId) {
      return res.status(404).json({ success: false, message: "Invalid event" });
    }

    // Send the video/audio buffer directly to the couple, right now
    await bot.telegram.sendVideo(chatId, {
      source: videoFile.buffer,
      filename: "message.webm",
    });

    res.json({ success: true, message: "Video sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(400)
    .json({ success: false, message: err.message || "Upload failed" });
});
export default app;
