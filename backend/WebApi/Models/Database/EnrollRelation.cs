using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WebApi.Models.Database
{
    [JsonObject]
    public class EnrollRelation
    {
        [JsonProperty("year")]
        public float Year { get; set; }

        [JsonProperty("groupID")]
        public int GroupId { get; set; }
    }
}
