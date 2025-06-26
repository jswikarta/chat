export default function ChatChannel(ws, roomId) {
  if (roomId) {
    const identifier = JSON.stringify({
      channel: "ChatChannel",
      room_id: roomId,
    });

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: identifier,
      }),
    );

    return () => {
      ws.send(
        JSON.stringify({
          command: "unsubscribe",
          identifier: identifier,
        }),
      );
    };
  }
}
