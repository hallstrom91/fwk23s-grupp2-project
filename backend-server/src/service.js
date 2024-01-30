require("dotenv").config();
const app = require("./server.js");
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Backend server is live and listening on port ${PORT}`);
});

//Listen and Log in terminal (date, time, ip & Request method).
app.use((req, res, next) => {
  console.log(
    `[DATE & TIME: ${new Date().toLocaleString()}] [USER-IP: ${
      req.ip
    }] [Req Method: ${req.method}] `
  );
  next();
});
