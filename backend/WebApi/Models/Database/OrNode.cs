using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WebApi.Models.Database
{
    [JsonObject]
    public class OrNode
    {
        [JsonProperty("id")]
        public int Id { get; set; }
    }
}
