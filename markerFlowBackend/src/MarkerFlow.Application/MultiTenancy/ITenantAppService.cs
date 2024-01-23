using Abp.Application.Services;
using MarkerFlow.MultiTenancy.Dto;

namespace MarkerFlow.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

