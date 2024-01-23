using System.Threading.Tasks;
using MarkerFlow.Configuration.Dto;

namespace MarkerFlow.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
