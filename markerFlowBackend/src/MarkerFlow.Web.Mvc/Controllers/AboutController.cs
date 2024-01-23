using Microsoft.AspNetCore.Mvc;
using Abp.AspNetCore.Mvc.Authorization;
using MarkerFlow.Controllers;

namespace MarkerFlow.Web.Controllers
{
    [AbpMvcAuthorize]
    public class AboutController : MarkerFlowControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}
