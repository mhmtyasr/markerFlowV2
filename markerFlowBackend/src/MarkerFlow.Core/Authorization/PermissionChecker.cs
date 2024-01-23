using Abp.Authorization;
using MarkerFlow.Authorization.Roles;
using MarkerFlow.Authorization.Users;

namespace MarkerFlow.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
