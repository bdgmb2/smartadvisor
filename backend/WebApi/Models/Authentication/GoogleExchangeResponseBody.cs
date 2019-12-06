using Newtonsoft.Json;

namespace WebApi.Models.Authentication
{
    [JsonObject]
    public class GoogleExchangeResponseBody
    {
        [JsonProperty("access_token", Required = Required.Always)]
        public string AccessToken { get; set; }

        [JsonProperty("id_token", Required = Required.Always)]
        public string IdToken { get; set; }

        [JsonProperty("expires_in", Required = Required.Always)]
        public string ExpiresIn { get; set; }

        [JsonProperty("token_type", Required = Required.Always)]
        public string TokenType { get; set; }

        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }
    }
}