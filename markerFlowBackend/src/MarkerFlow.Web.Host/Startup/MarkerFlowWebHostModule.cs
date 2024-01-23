using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MarkerFlow.Configuration;

namespace MarkerFlow.Web.Host.Startup
{
    [DependsOn(
       typeof(MarkerFlowWebCoreModule))]
    public class MarkerFlowWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public MarkerFlowWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MarkerFlowWebHostModule).GetAssembly());
        }
    }
}
