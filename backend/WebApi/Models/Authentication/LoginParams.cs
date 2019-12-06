using Newtonsoft.Json;

namespace WebApi.Models.Authentication
{
    /// <summary>
    /// Login parameters used when signing in with an external service such as Google.
    /// </summary>
    [JsonObject]
    public class LoginParams
    {
        /// <summary>
        /// Authorization code that can be exchanged for an ID token.
        /// </summary>
        [JsonProperty(Required = Required.Always)]
        public string Code { get; set; }
    }
}
