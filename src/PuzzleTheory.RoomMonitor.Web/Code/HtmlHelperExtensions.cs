using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;

namespace PuzzleTheory.RoomMonitor.Web.Code
{
    public static class HtmlHelperExtensions
    {
        public static IHtmlContent IncludeInitialAngularBindings(this IHtmlHelper helper, object model)
        {
            return helper.Hidden("InitialBindingModel", helper.Raw(JsonConvert.SerializeObject(model)), null);
        }
    }
}
