CREATE TABLE
    messages (
        id SERIAL PRIMARY KEY,
        content VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );