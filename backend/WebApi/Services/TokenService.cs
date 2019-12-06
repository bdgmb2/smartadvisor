using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace WebApi.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration configuration;

        public TokenService(IConfiguration configuration)
        {
            this.configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public string CreateToken(IEnumerable<Claim> claims)
        {
            var configSection = this.configuration.GetSection("Auth:Tokens");

            // Create token descriptor
            var tokenHandler = new JwtSecurityTokenHandler();
            var encryptionKey = Encoding.ASCII.GetBytes(configSection["EncryptionKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = configSection["Issuer"],
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(configSection["ExpirationMinutes"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(encryptionKey), SecurityAlgorithms.HmacSha256Signature),
            };

            // Generate and return token
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool ValidateToken(string token)
        {
            var configSection = this.configuration.GetSection("Auth:Tokens");

            var tokenHandler = new JwtSecurityTokenHandler();
            var encryptionKey = Encoding.ASCII.GetBytes(configSection["EncryptionKey"]);
            var tokenValidationParameters = new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(encryptionKey),
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidIssuer = configSection["Issuer"],
            };

            try
            {
                tokenHandler.ValidateToken(token, tokenValidationParameters, out _);
            }
            catch (SecurityTokenException)
            {
                return false;
            }

            return true;
        }

        public IEnumerable<Claim> GetTokenClaims(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            return handler.ReadJwtToken(token).Claims;
        }
    }
}