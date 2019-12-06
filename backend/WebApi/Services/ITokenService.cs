using System.Collections.Generic;
using System.Security.Claims;

namespace WebApi.Services
{
    public interface ITokenService
    {
        string CreateToken(IEnumerable<Claim> claims);

        bool ValidateToken(string token);

        IEnumerable<Claim> GetTokenClaims(string token);
    }
}
