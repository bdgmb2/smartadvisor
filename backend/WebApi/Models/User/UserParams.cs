using Newtonsoft.Json;

namespace WebApi.Models.User
{
    [JsonObject]
    public class UserParams
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string ProfileUrl { get; set; }
    }
}
