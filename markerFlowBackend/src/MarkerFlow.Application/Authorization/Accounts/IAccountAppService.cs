using System.Threading.Tasks;
using Abp.Application.Services;
using MarkerFlow.Authorization.Accounts.Dto;

namespace MarkerFlow.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
