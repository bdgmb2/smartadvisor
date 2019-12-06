using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Degree;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    [Authorize]
    public class DegreeController : ControllerBase
    {
        private IDatabaseService databaseService;
        private ITokenService tokenService;

        public DegreeController(IDatabaseService databaseService, ITokenService tokenService)
        {
            this.databaseService = databaseService ?? throw new ArgumentNullException(nameof(databaseService));
            this.tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        [HttpGet("degree/all")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<Degree[]>> GetAllDegrees()
        {
            var result = await this.databaseService.GetDegrees();
            var response = new List<Degree>();
            foreach (var degree in result)
            {
                for (int k = (int)degree.StartingYear; k <= degree.EndingYear; k++)
                {
                    response.Add(new Degree
                    {
                        CatalogYear = k,
                        Department = degree.Name,
                        Type = degree.IsMajor ? "Major" : "Minor",
                    });
                }
            }

            return response.ToArray();
        }
    }
}