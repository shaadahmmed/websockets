import { MatchTable } from "@/db/schema";
import { Server as HttpServer } from "http";
import { WebSocket, WebSocketServer } from "ws";

interface AliveWebSocket extends WebSocket {
    isAlive: boolean;
}

export function sendJson(socket: WebSocket, payload: Record<string, unknown>) {
    if (socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify(payload));
}

export function broadcast(
    wss: WebSocketServer,
    payload: Record<string, unknown>,
) {
    wss.clients.forEach((client) => {
        sendJson(client, payload);
    });
}

export function attachWsServer(server: HttpServer) {
    const wss = new WebSocketServer({
        server,
        path: "/ws",
        maxPayload: 1024 * 1024,
    });

    wss.on("connection", (socket: AliveWebSocket) => {
        socket.isAlive = true;
        socket.on("pong", () => (socket.isAlive = true));

        sendJson(socket, { message: "Welcome to the WebSocket server!" });
        socket.on("error", console.error);
    });

    const interval = setInterval(() => {
        wss.clients.forEach((ws) => {
            const client = ws as AliveWebSocket;
            if (!client.isAlive) return client.terminate();
            client.isAlive = false;
            client.ping();
        });
    }, 30000);

    wss.on("close", () => clearInterval(interval));

    function broadcastMatchCreated(match: typeof MatchTable.$inferSelect) {
        broadcast(wss, { type: "match_created", data: match });
    }

    return { broadcastMatchCreated };
}
