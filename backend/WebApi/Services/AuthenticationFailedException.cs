using System;

namespace WebApi.Services
{
    public class AuthenticationFailedException : Exception
    {
        public AuthenticationFailedException(string message)
            : base(message)
        {
        }

        public AuthenticationFailedException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}
