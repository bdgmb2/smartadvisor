using Newtonsoft.Json;

namespace WebApi.Models.Database
{
    [JsonObject]
    public class DegreeNode
    {
        [JsonProperty("isMajor")]
        public bool IsMajor { get; set; }

        [JsonProperty("additionalReq")]
        public string AdditionalRequirements { get; set; }

        [JsonProperty("startYear")]
        public float StartYear { get; set; }

        [JsonProperty("endYear")]
        public float EndYear { get; set; }

        [JsonProperty("hours")]
        public float? Hours { get; set; }
    }
}
