import express from "express";
import bot from "./bot.js";
import path from "./routes/back.js";
import "dotenv/config";
const app = express();
import cors from "cors";

app.use(express.json());
app.use("/api", path);
app.use(
  cors({
    origin: "https://frontqr.vercel.app",
  })
);

app.get("/main", (req, res) => {
  return res.status(200).json("it is working");
});

const port = 2400;
bot.launch().catch((err) => {
  console.error("Bot failed to launch:", err.message);
});
console.log("Bot is running...");
//  this SIGINT WILL STOP THE BOT WHEN THE  DEV CLCIK ctrl+c
process.once("SIGINT", () => bot.stop("SIGINT"));
// this SIGTERM WILL STOP THE BOT WHEN THE SERVER IS DOWN MEANS  THE HOSTING
process.once("SIGTERM", () => bot.stop("SIGTERM"));

app.listen(port, () => {
  console.log(`server is running in ${port}`);
});
