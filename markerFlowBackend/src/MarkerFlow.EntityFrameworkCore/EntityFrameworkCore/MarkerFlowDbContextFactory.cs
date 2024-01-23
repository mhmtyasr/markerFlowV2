using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using MarkerFlow.Configuration;
using MarkerFlow.Web;

namespace MarkerFlow.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class MarkerFlowDbContextFactory : IDesignTimeDbContextFactory<MarkerFlowDbContext>
    {
        public MarkerFlowDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MarkerFlowDbContext>();
            
            /*
             You can provide an environmentName parameter to the AppConfigurations.Get method. 
             In this case, AppConfigurations will try to read appsettings.{environmentName}.json.
             Use Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") method or from string[] args to get environment if necessary.
             https://docs.microsoft.com/en-us/ef/core/cli/dbcontext-creation?tabs=dotnet-core-cli#args
             */
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            MarkerFlowDbContextConfigurer.Configure(builder, configuration.GetConnectionString(MarkerFlowConsts.ConnectionStringName));

            return new MarkerFlowDbContext(builder.Options);
        }
    }
}
