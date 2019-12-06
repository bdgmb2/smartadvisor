using System.Threading.Tasks;
using WebApi.Models.Authentication;

namespace WebApi.Services
{
    public interface IGoogleOpenIdConnectProvider
    {
        Task<GoogleExchangeResponseBody> ExchangeCode(string authCode);
    }
}