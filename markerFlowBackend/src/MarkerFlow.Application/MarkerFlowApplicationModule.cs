using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MarkerFlow.Authorization;

namespace MarkerFlow
{
    [DependsOn(
        typeof(MarkerFlowCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class MarkerFlowApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<MarkerFlowAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(MarkerFlowApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
