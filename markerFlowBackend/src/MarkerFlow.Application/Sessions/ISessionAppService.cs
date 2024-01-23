using System.Threading.Tasks;
using Abp.Application.Services;
using MarkerFlow.Sessions.Dto;

namespace MarkerFlow.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
