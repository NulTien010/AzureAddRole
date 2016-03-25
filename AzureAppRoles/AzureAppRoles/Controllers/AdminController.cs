using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace AzureAppRoles.Controllers
{
    [RoutePrefix("api/admin")]
    public class AdminController : ApiController
    {
        [Route("administer")]
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult Administer()
        {
            var user = User;
            var claim =
                ((ClaimsPrincipal)user).Claims.FirstOrDefault(
                    clm => clm.Type.Equals("roles", StringComparison.CurrentCultureIgnoreCase));

            // do additional action here

            return Ok();
        }
    }
}
