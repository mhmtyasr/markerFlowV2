using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using MarkerFlow.Configuration.Dto;

namespace MarkerFlow.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : MarkerFlowAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
