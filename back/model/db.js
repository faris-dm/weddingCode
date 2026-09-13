import "dotenv/config";
import pg from "pg";

const Pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

// --- Event functions ---

async function saveEvent(eventId, chatId) {
  await Pool.query("INSERT INTO events (event_id, chat_id) VALUES ($1, $2)", [
    eventId,
    chatId,
  ]);
}

async function getChatIdFromEventId(eventId) {
  const result = await Pool.query(
    "SELECT chat_id FROM events WHERE event_id = $1",
    [eventId]
  );
  if (result.rows.length === 0) return null;
  return result.rows[0].chat_id;
}

// --- Video functions ---

async function saveVideo(eventId, filePath) {
  const result = await Pool.query(
    "INSERT INTO videos (event_id, file_path) VALUES ($1, $2) RETURNING id",
    [eventId, filePath]
  );
  return result.rows[0].id;
}

async function getVideoById(videoId) {
  const result = await Pool.query("SELECT * FROM videos WHERE id = $1", [
    videoId,
  ]);
  return result.rows[0];
}

async function updateVideoStatus(videoId, status) {
  await Pool.query("UPDATE videos SET status = $1 WHERE id = $2", [
    status,
    videoId,
  ]);
}

export {
  saveEvent,
  getChatIdFromEventId,
  saveVideo,
  getVideoById,
  updateVideoStatus,
};
export default Pool;
