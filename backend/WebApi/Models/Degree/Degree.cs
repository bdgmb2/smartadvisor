using Newtonsoft.Json;

namespace WebApi.Models.Degree
{
    [JsonObject]
    public class Degree
    {
        public string Department { get; set; }

        public string Type { get; set; }

        public int CatalogYear { get; set; }
    }
}
