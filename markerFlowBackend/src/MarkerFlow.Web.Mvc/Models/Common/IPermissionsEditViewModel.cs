using System.Collections.Generic;
using MarkerFlow.Roles.Dto;

namespace MarkerFlow.Web.Models.Common
{
    public interface IPermissionsEditViewModel
    {
        List<FlatPermissionDto> Permissions { get; set; }
    }
}