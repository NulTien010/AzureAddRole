using System.Configuration;
using System.IdentityModel.Tokens;
using System.Web.Http;
using Microsoft.Owin.Security.ActiveDirectory;
using Owin;

namespace AzureAppRoles
{
    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app, HttpConfiguration configuration)
        {
            app.UseWindowsAzureActiveDirectoryBearerAuthentication(new WindowsAzureActiveDirectoryBearerAuthenticationOptions
            {
                TokenValidationParameters =
                    new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidAudience = ConfigurationManager.AppSettings["ida:Audience"],
                        RoleClaimType = "roles"
                    },
                Tenant = ConfigurationManager.AppSettings["ida:Tenant"]
            });
        }
    }
}