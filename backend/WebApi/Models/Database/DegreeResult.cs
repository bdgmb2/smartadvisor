using Newtonsoft.Json;

namespace WebApi.Models.Database
{
    [JsonObject]
    public class DegreeResult
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("isMajor")]
        public bool IsMajor { get; set; }

        [JsonProperty("startingYear")]
        public float StartingYear { get; set; }

        [JsonProperty("endingYear")]
        public float EndingYear { get; set; }
    }
}
