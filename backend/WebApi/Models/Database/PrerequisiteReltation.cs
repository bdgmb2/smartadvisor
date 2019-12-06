using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WebApi.Models.Database
{
    [JsonObject]
    public class PrerequisiteReltation
    {
        [JsonProperty("coReq")]
        public int Corequisite { get; set; }

        [JsonProperty("equvilents")]
        public bool Equivilance { get; set; }
    }
}
