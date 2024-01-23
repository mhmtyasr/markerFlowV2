using System.Collections.Generic;
using MarkerFlow.Roles.Dto;

namespace MarkerFlow.Web.Models.Users
{
    public class UserListViewModel
    {
        public IReadOnlyList<RoleDto> Roles { get; set; }
    }
}
