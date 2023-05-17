import express from "express";
import {RowDataPacket, createConnection} from "mysql2/promise";

type Message = RowDataPacket & {
  id: number;
  content: string;
  created_at: Date;
};

// MySQL への接続の際に環境変数が設定されている場合はそれを使うように設定。
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD =
  process.env.DB_PASSWORD || "this-is-password_please-rewrite-this";
const DB_NAME = process.env.DB_NAME || "chat_app_db";
const DB_SOCKET_PATH = process.env.DB_SOCKET_PATH;

const startServer = async (): Promise<void> => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // MySQLデータベースへの接続
  const connection = await createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    // When `socketPath` is defined, `host` is ignored.
    socketPath: DB_SOCKET_PATH,
    // Timezone on MySQL must be set to UTC.
    timezone: "Z",
  });

  // `/messages` への POST リクエストを受け取って、リクエストの "message" フィールドを MySQL
  // に保存する
  app.post("/messages", async (req, res) => {
    console.log("POST /messages");

    const {message} = req.body;

    try {
      const query = "INSERT INTO messages (content) VALUES (?)";
      console.log("query:", query);
      console.log("args:", [message]);
      await connection.execute(query, [message]);
      res.status(200).json({success: true});
    } catch (error) {
      console.error(error);
      res.status(500).json({success: false, error: "Failed to save message."});
    }
  });

  // `/messages` への GET リクエストを受け取って MySQL からデータを取得して JSON で返す
  app.get("/messages", async (_req, res) => {
    console.log("GET /messages");
    try {
      const query =
        "SELECT content, created_at FROM messages order by created_at desc";
      const [rows] = await connection.execute<Message[]>(query);
      console.log("query:", query);
      console.log("result:", rows);
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({success: false, error: "Failed to fetch messages."});
    }
  });

  // サーバーを終了したときに MySQL への接続を切断する
  app.on("close", () => connection.end());

  const server = app.listen(port, () => {
    console.log(
      `Server is running. See http://localhost:${port}/messages to get messages.`
    );
  });

  process.on("SIGINT", () => {
    console.log("SIGINT signal received: closing HTTP server");
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  });
};

startServer();
