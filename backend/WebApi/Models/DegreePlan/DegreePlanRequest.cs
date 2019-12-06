using Newtonsoft.Json;

namespace WebApi.Models.DegreePlan
{
    [JsonObject]
    public class DegreePlanRequest
    {
        [JsonProperty("department", Required = Required.Always)]
        public string Department { get; set; }

        [JsonProperty("isMajor", Required = Required.Always)]
        public bool IsMajor { get; set; }

        [JsonProperty("year", Required = Required.Always)]
        public float Year { get; set; }
    }
}
