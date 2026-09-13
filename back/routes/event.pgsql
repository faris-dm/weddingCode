CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_id TEXT UNIQUE NOT NULL ,
    chat_id BIGINT  NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)


CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    event_id TEXT NOT NULL,
    file_path TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);