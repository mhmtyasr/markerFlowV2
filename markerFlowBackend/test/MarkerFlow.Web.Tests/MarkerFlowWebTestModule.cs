using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MarkerFlow.EntityFrameworkCore;
using MarkerFlow.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace MarkerFlow.Web.Tests
{
    [DependsOn(
        typeof(MarkerFlowWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class MarkerFlowWebTestModule : AbpModule
    {
        public MarkerFlowWebTestModule(MarkerFlowEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MarkerFlowWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(MarkerFlowWebMvcModule).Assembly);
        }
    }
}