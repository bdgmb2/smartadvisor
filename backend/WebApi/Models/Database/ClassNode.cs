using Newtonsoft.Json;

namespace WebApi.Models.Database
{
    [JsonObject]
    public class ClassNode
    {
        [JsonProperty("creditHours")]
        public int CreditHours { get; set; }

        [JsonProperty("repeatable")]
        public bool Repeatable { get; set; }

        [JsonProperty("maxHours")]
        public int MaxHours { get; set; }

        [JsonProperty("stillListed")]
        public bool StillListed { get; set; }

        [JsonProperty("additionalReq")]
        public string AdditionalRequirement { get; set; }

        [JsonProperty("reqHours")]
        public int RequiredHours { get; set; }

        [JsonProperty("courseId")]
        public string CourseId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("majorOnly")]
        public bool MajorOnly { get; set; }
    }
}
