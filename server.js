const { app } = require("./app.js");
const http = require("http");
const { WebSocket, WebSocketServer } = require("ws");

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

wss.on("connection", (ws) => {
  //   console.log("client connected with ID: " + client.id); //no id
  console.log("Client Connected!");

  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    console.log("Client Message: " + parsedMessage);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
        console.log("Client Message: " + JSON.stringify(parsedMessage));
      }
    });
  });

  ws.on("close", () => {
    console.log("Client Disconnected!");
  });
});

server.listen(443, () => {
  console.log("WebSocket running on port 443");
});
