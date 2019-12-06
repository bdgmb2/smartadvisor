using Newtonsoft.Json;

namespace WebApi.Models.Database
{
    [JsonObject]
    public class DegreePlan
    {
        [JsonProperty("className")]
        public string ClassName { get; set; }

        [JsonProperty("department")]
        public string Department { get; set; }

        [JsonProperty("courseId")]
        public string CourseId { get; set; }

        [JsonProperty("hours")]
        public int Hours { get; set; }

        [JsonProperty("repeatable")]
        public bool Repeatable { get; set; }

        [JsonProperty("majorOnly")]
        public bool MajorOnly { get; set; }

        [JsonProperty("requiredHours")]
        public int RequiredHours { get; set; }

        /// <remarks>
        /// 9999 represents infinite.
        /// </remarks>
        [JsonProperty("maxHours")]
        public int MaxHours { get; set; }

        [JsonProperty("additionalReq")]
        public string AdditionalRequirement { get; set; }

        /// <remarks>
        /// or Id for "OR" nodes.
        /// </remarks>
        [JsonProperty("oId")]
        public long OId { get; set; }
    }
}
