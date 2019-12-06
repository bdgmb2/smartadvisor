using Newtonsoft.Json;

namespace WebApi.Models.Database
{
    [JsonObject]
    public class UserNode
    {
        [JsonProperty("userID")]
        public string UserId { get; set; }
    }
}
