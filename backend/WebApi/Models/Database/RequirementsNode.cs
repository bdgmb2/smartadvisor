using Newtonsoft.Json;

namespace WebApi.Models.Database
{
    [JsonObject]
    public class RequirementsNode
    {
        [JsonProperty("hours")]
        public int Hours { get; set; }

        [JsonProperty("departments")]
        public string Department { get; set; }

        [JsonProperty("courseRegex")]
        public string Regex { get; set; }
    }
}
