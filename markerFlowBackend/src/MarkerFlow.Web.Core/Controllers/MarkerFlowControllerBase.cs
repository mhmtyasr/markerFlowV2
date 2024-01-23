using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace MarkerFlow.Controllers
{
    public abstract class MarkerFlowControllerBase: AbpController
    {
        protected MarkerFlowControllerBase()
        {
            LocalizationSourceName = MarkerFlowConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
