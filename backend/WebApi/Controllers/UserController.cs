using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.User;
using WebApi.Services;

namespace WebApi.Controllers
{
    /// <summary>
    /// Endpoints for managing the current user.
    /// </summary>
    [Route("api/user")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly ITokenService tokenService;

        public UserController(ITokenService tokenService)
        {
            this.tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public ActionResult<UserParams> GetUser([FromHeader(Name = "Authorization")] string authJwt)
        {
            _ = authJwt ?? throw new ArgumentNullException(nameof(authJwt));

            var claims = this.tokenService.GetTokenClaims(authJwt.Replace("Bearer ", string.Empty)).ToArray();
            return new UserParams
            {
                Id = claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value,
                Email = claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Email)?.Value,
                FirstName = claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.GivenName)?.Value,
                LastName = claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.FamilyName)?.Value,
                ProfileUrl = claims.FirstOrDefault(claim => claim.Type == "picture")?.Value,
            };
        }
    }
}