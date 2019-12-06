using Newtonsoft.Json;

namespace WebApi.Models.Authentication
{
    [JsonObject(ItemRequired = Required.Always)]
    public class GoogleExchangeRequestBody
    {
        [JsonProperty("code", Required = Required.Always)]
        public string Code { get; set; }

        [JsonProperty("client_id", Required = Required.Always)]
        public string ClientId { get; set; }

        [JsonProperty("client_secret", Required = Required.Always)]
        public string ClientSecret { get; set; }

        [JsonProperty("redirect_uri", Required = Required.Always)]
        public string RedirectUri { get; set; }

        [JsonProperty("grant_type", Required = Required.Always)]
        public string GrantType { get; set; }
    }
}
