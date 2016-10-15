using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PuzzleTheory.RoomMonitor.Web.Models;

namespace PuzzleTheory.RoomMonitor.Web.Controllers
{
    public class AdministrationController : Controller
    {
        public IActionResult Index()
        {
            //todo: get rooms from EF as IRoom, map to viewmodels, and return them here.
            var viewModel = new List<RoomViewModel>
            {
                new RoomViewModel
                {
                    Id = 1,
                    Name = "The big room",
                    StartMinutes = 120
                },
                new RoomViewModel
                {
                    Id = 2,
                    Name = "The little room",
                    StartMinutes = 60
                }
            };
            return View(viewModel);
        }
    }
}
