using System;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using WebApi.Models.Authentication;

namespace WebApi.Services
{
    public class GoogleOpenIdConnectProvider : IGoogleOpenIdConnectProvider
    {
        private readonly IConfiguration configuration;
        private readonly HttpClient client;

        public GoogleOpenIdConnectProvider(IConfiguration configuration, HttpClient client)
        {
            this.configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            this.client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<GoogleExchangeResponseBody> ExchangeCode(string authCode)
        {
            _ = authCode ?? throw new ArgumentNullException(nameof(authCode));

            var configSection = this.configuration.GetSection("Auth:Google");
            var body = new GoogleExchangeRequestBody
            {
                Code = authCode,
                ClientId = configSection["ClientId"],
                ClientSecret = configSection["ClientSecret"],
                GrantType = "authorization_code",
                RedirectUri = configSection["RedirectUri"],
            };

            using (var content = new ObjectContent<GoogleExchangeRequestBody>(body, new JsonMediaTypeFormatter(), MediaTypeNames.Application.Json))
            {
                var response = await this.client.PostAsync("token", content);
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsAsync<GoogleExchangeResponseBody>();
            }
        }
    }
}
