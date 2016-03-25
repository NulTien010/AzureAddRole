using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace AzureAppRoles.Controllers
{
    [RoutePrefix("api/blog")]
    public class BlogController : ApiController
    {
        [Route("dosomeaction")]
        [HttpGet]
        [Authorize]
        public IHttpActionResult DoSomeAction()
        {
            return Ok();
        }

        [Route("newpost")]
        [HttpGet]
        [Authorize(Roles = "Writer")]
        public IHttpActionResult NewPost()
        {
            var user = User;
            var claim =
                ((ClaimsPrincipal)user).Claims.FirstOrDefault(
                    clm => clm.Type.Equals("roles", StringComparison.CurrentCultureIgnoreCase));

            // do additional action here

            return Ok();
        }

        [Route("reviewandpublish")]
        [HttpGet]
        [Authorize(Roles = "Editor")]
        public IHttpActionResult ReviewAndPublish()
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
