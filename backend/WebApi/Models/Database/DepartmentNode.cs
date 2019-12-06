using Newtonsoft.Json;

namespace WebApi.Models.Database
{
    [JsonObject]
    public class DepartmentNode
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
