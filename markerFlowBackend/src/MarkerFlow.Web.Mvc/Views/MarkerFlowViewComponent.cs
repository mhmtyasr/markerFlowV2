using Abp.AspNetCore.Mvc.ViewComponents;

namespace MarkerFlow.Web.Views
{
    public abstract class MarkerFlowViewComponent : AbpViewComponent
    {
        protected MarkerFlowViewComponent()
        {
            LocalizationSourceName = MarkerFlowConsts.LocalizationSourceName;
        }
    }
}
