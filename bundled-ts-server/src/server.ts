import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Return "hello world" with text/html content type.
app.get("/", (req, res) => {
  res.type("text/html");
  res.send(
    "<!doctype html><h1>Hello from <span style='color: red'>bundled</span>-ts-server</h1>"
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
