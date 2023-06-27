using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace PainterLanding
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            LanguagePageRpute(routes);
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

           
        }

        private static void LanguagePageRpute(RouteCollection routes)
        
        {
            
            routes.MapRoute(
               name: "expert-contractor",
               url: "Hindi",
               defaults: new { controller = "Home", action = "HindiPageRedirect", id = UrlParameter.Optional }
           );
            
        }

    }
}
