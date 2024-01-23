using Abp.AspNetCore.Mvc.Views;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Mvc.Razor.Internal;

namespace MarkerFlow.Web.Views
{
    public abstract class MarkerFlowRazorPage<TModel> : AbpRazorPage<TModel>
    {
        [RazorInject]
        public IAbpSession AbpSession { get; set; }

        protected MarkerFlowRazorPage()
        {
            LocalizationSourceName = MarkerFlowConsts.LocalizationSourceName;
        }
    }
}
