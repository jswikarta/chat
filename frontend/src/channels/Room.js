export default function RoomChannel(ws) {
  const guid = Math.random().toString(36).substring(2, 15);

  const identifier = JSON.stringify({
    channel: "RoomChannel",
    id: guid,
  });

  ws.send(
    JSON.stringify({
      command: "subscribe",
      identifier: identifier,
    }),
  );
}
