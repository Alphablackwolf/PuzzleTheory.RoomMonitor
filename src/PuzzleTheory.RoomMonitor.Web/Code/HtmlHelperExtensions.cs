using System.Collections;
using System.Reflection;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;

namespace PuzzleTheory.RoomMonitor.Web.Code
{
    public static class HtmlHelperExtensions
    {
        public static IHtmlContent IncludeInitialAngularBindings<T>(this IHtmlHelper<T> helper, T model)
        {
            return helper.Hidden(GetInitialAngularBindingName(model), helper.Raw(JsonConvert.SerializeObject(model)), null);
        }

        private static string GetInitialAngularBindingName<T>(T instance, bool pluralize = false)
        {
            if (!(instance is IEnumerable)) return $"{typeof(T).Name}{(pluralize && !typeof(T).Name.EndsWith("s") ? "s" : string.Empty)}Binding";
            var internalType = typeof(T).GetGenericTypeDefinition();
            return GetInitialAngularBindingName(internalType, true);
        }
    }
}
