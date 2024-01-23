using System.Collections.Generic;
using MarkerFlow.Roles.Dto;

namespace MarkerFlow.Web.Models.Roles
{
    public class RoleListViewModel
    {
        public IReadOnlyList<PermissionDto> Permissions { get; set; }
    }
}
