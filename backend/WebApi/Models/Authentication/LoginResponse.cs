namespace WebApi.Models.Authentication
{
    /// <summary>
    /// Response from successfully logging in.
    /// </summary>
    public class LoginResponse
    {
        /// <summary>
        /// The authenticated user's ID token.
        /// </summary>
        public string Token { get; set; }
    }
}
