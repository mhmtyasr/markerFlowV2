using Abp.Application.Services.Dto;

namespace MarkerFlow.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

