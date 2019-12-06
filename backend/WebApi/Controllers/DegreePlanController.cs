using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Database;
using WebApi.Models.DegreePlan;
using WebApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace WebApi.Controllers
{
    [Route("api")]
    [Authorize]
    public class DegreePlanController : Controller
    {
        private ITokenService tokenService;
        private IDatabaseService databaseService;

        public DegreePlanController(ITokenService tokenService, IDatabaseService databaseService)
        {
            this.tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
            this.databaseService = databaseService ?? throw new ArgumentNullException(nameof(databaseService));
        }

        [HttpPut("degreeplan/degree/{groupId}")]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult> AddDegreeToDegreePlan([FromHeader(Name = "Authorization")] string authJwt, [FromRoute] int groupId, [FromBody] DegreePlanRequest request)
        {
            var id = this.tokenService.GetTokenClaims(authJwt.Replace("Bearer ", string.Empty)).First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;

            if (await this.databaseService.AddDegreeToPlan(id, groupId, request.Department, request.IsMajor, request.Year))
            {
                return new StatusCodeResult((int)HttpStatusCode.NoContent);
            }

            return new StatusCodeResult((int)HttpStatusCode.BadRequest);
        }

        [HttpDelete("degreeplan/degree/{groupId}")]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        public async Task<ActionResult> RemoveDegreeFromPlan([FromHeader(Name = "Authorization")] string authJwt, [FromRoute] int groupId, [FromBody] DegreePlanRequest request)
        {
            var id = this.tokenService.GetTokenClaims(authJwt.Replace("Bearer ", string.Empty)).First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;

            await this.databaseService.DeleteDegreeFromPlan(id, groupId, request.Department, request.IsMajor, request.Year);
            return new StatusCodeResult((int)HttpStatusCode.NoContent);
        }

        [HttpGet("degreeplan/all")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<DegreePlanResult[]>> GetDegreePlans([FromHeader(Name = "Authorization")] string authJwt)
        {
            var id = this.tokenService.GetTokenClaims(authJwt.Replace("Bearer ", string.Empty)).First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;

            return (await this.databaseService.GetDegreePlans(id)).ToArray();
        }

        [HttpGet("degreeplan/{groupId}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<DegreePlanRequirementResult>> GetDegreePlan([FromHeader(Name = "Authorization")] string authJWT, [FromRoute] int groupId)
        {
            var id = this.tokenService.GetTokenClaims(authJWT.Replace("Bearer ", string.Empty)).First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;

            return await this.databaseService.GetDegreePlan(id);
        }

        [HttpPost("degreeplan/")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult<int>> CreateDegreePlan([FromHeader(Name = "Authorization")] string authJwt, [FromBody] DegreePlanRequest[] request)
        {
            _ = request ?? throw new ArgumentNullException(nameof(request));

            var id = this.tokenService.GetTokenClaims(authJwt.Replace("Bearer ", string.Empty)).First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;

            var largest = (await this.databaseService.GetDegreePlans(id)).Max(result => result.GroupId);
            if (request.Length < 1)
            {
                return new StatusCodeResult((int)HttpStatusCode.BadRequest);
            }

            var first = request[0];

            // TODO: make this Threadsafe
            if (await this.databaseService.CreateDegreePlan(id, first.Department, first.IsMajor, first.Year, largest + 1))
            {
                for (var k = 1; k < request.Length; k++)
                {
                    var item = request[k];
                    await this.databaseService.AddDegreeToPlan(id, largest + 1, item.Department, item.IsMajor, item.Year);
                }

                return largest + 1;
            }
            else
            {
                return new StatusCodeResult((int)HttpStatusCode.BadRequest);
            }
        }

        [HttpDelete("degreeplan/{groupId}")]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        public async Task<ActionResult> DeleteDegreePlan([FromHeader(Name = "Authorization")] string authJwt, [FromRoute] int groupId)
        {
            var id = this.tokenService.GetTokenClaims(authJwt.Replace("Bearer ", string.Empty)).First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;

            await this.databaseService.DeleteDegreePlan(id, groupId);

            return new StatusCodeResult((int)HttpStatusCode.NoContent);
        }
    }
}
