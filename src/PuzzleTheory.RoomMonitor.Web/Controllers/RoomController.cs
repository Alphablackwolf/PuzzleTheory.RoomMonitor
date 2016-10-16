using Microsoft.AspNetCore.Mvc;

namespace PuzzleTheory.RoomMonitor.Web.Controllers
{
    public class RoomController : Controller
    {
        public IActionResult Index(int id)
        {
            return View();
        }
    }
}
