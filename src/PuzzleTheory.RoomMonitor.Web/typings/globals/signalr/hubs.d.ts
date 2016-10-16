interface SignalR {
    roomHub: IRoomHub;
}

interface IRoomHub {
    client: IRoomHubClient;
    server: IRoomHubServer;
}

interface IRoomHubClient {
    initiateTimer: (startMinutes: number) => void;
}

interface IRoomHubServer {
    initiateTimer(roomId: number, startMinutes: number): Promise<void>;
}
