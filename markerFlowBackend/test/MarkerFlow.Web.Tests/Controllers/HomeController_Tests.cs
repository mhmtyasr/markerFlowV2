using System.Threading.Tasks;
using MarkerFlow.Models.TokenAuth;
using MarkerFlow.Web.Controllers;
using Shouldly;
using Xunit;

namespace MarkerFlow.Web.Tests.Controllers
{
    public class HomeController_Tests: MarkerFlowWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}