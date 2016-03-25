using System;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(AzureAppRoles.Startup))]

namespace AzureAppRoles
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888

            // Get your HttpConfiguration. In OWIN, you'll create one
            // rather than using GlobalConfiguration.
            var configuration = new HttpConfiguration();

            ConfigureAuth(app, configuration);

            WebApiConfig.Register(configuration);
            // Additional settings
            app.UseWebApi(configuration);
        }
    }
}
