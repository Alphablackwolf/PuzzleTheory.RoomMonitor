using Microsoft.AspNetCore.SignalR;

namespace PuzzleTheory.RoomMonitor.Web.Code
{
    public class RoomHub : Hub<IRoomHubClient>
    {
        public void InitiateTimer(int roomId, int startMinutes)
        {
            Clients.Group(roomId.ToString()).InitializeTimer(startMinutes);
        }
    }

    
}
