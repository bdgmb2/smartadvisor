using System;
using System.Net.Http;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Extensions.Http;
using WebApi.Services;

namespace WebApi.Extensions
{
    public static class GoogleServiceExtensions
    {
        public static IServiceCollection AddGoogleOpenIdConnectProvider(this IServiceCollection services, string tokenEndpoint)
        {
            services.AddHttpClient<IGoogleOpenIdConnectProvider, GoogleOpenIdConnectProvider>()
                .ConfigureHttpClient(client => client.BaseAddress = new Uri(tokenEndpoint))
                .AddPolicyHandler(GetRetryPolicy())
                .AddPolicyHandler(GetCircuitBreakerPolicy());

            return services;
        }

        private static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
        {
            var jitter = new Random();

            return HttpPolicyExtensions
                .HandleTransientHttpError()
                .WaitAndRetryAsync(5, GetDelay);

            TimeSpan GetDelay(int attempts)
            {
                return TimeSpan.FromSeconds(Math.Pow(2, attempts)) + TimeSpan.FromMilliseconds(jitter.Next(0, 100));
            }
        }

        private static IAsyncPolicy<HttpResponseMessage> GetCircuitBreakerPolicy()
        {
            return HttpPolicyExtensions
                .HandleTransientHttpError()
                .CircuitBreakerAsync(5, TimeSpan.FromSeconds(30));
        }
    }
}
