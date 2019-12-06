using System.Collections.Generic;
using Newtonsoft.Json;

namespace WebApi.Models.Authentication
{
    [JsonObject]
    public class LocalLoginParams
    {
        [JsonProperty(Required = Required.Always)]
        public string User { get; set; }

        [JsonProperty]
        public Dictionary<string, string> AdditionalClaims { get; set; }
    }
}
