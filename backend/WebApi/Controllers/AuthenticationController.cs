using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Models.Authentication;
using WebApi.Services;

namespace WebApi.Controllers
{
    /// <summary>
    /// Handles user authentication.
    /// </summary>
    [Route("api")]
    [ApiController]
    public class AuthenticationController
    {
        private readonly IGoogleOpenIdConnectProvider oidcProvider;
        private readonly ITokenService tokenService;

        public AuthenticationController(IGoogleOpenIdConnectProvider oidcProvider, ITokenService tokenService)
        {
            this.oidcProvider = oidcProvider ?? throw new ArgumentNullException(nameof(oidcProvider));
            this.tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public ActionResult<VersionResponse> Version()
        {
            return new VersionResponse
            {
                Version = Program.Version,
            };
        }

        /// <summary>
        /// Attempts to log in the user with an authorization code from Google.
        /// </summary>
        /// <param name="body">The login parameters.</param>
        /// <returns>The user's credentials.</returns>
        [HttpPost("login")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginParams body)
        {
            _ = body ?? throw new ArgumentNullException(nameof(body));

            try
            {
                // Trade auth code for tokens
                var response = await this.oidcProvider.ExchangeCode(body.Code);
                var payload = await GoogleJsonWebSignature.ValidateAsync(response.IdToken);

                // Create and sign a new ID token
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, payload.Email),
                    new Claim(JwtRegisteredClaimNames.Email, payload.Email),
                    new Claim(JwtRegisteredClaimNames.FamilyName, payload.FamilyName),
                    new Claim(JwtRegisteredClaimNames.GivenName, payload.GivenName),
                    new Claim("picture", payload.Picture),
                    new Claim("name", payload.Name),
                };

                return new LoginResponse
                {
                    Token = this.tokenService.CreateToken(claims),
                };
            }
            catch (InvalidJwtException)
            {
                return new UnauthorizedResult();
            }
            catch (AuthenticationFailedException)
            {
                return new UnauthorizedResult();
            }
        }

#if ALLOWFAKEAUTH
        /// <summary>
        /// Development login endpoint that generates a valid ID token for the user.
        /// </summary>
        /// <param name="body">Login parameters.</param>
        /// <returns>The user's credentials.</returns>
        [HttpPost("locallogin")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public ActionResult<LoginResponse> LocalLogin([FromBody] LocalLoginParams body)
        {
            _ = body ?? throw new ArgumentNullException(nameof(body));

            // Claims
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, body.User),
            };

            if (body.AdditionalClaims != null)
            {
                foreach (var (type, value) in body.AdditionalClaims)
                {
                    claims.Add(new Claim(type, value));
                }
            }

            return new LoginResponse
            {
                Token = this.tokenService.CreateToken(claims),
            };
        }
#endif
    }
}
