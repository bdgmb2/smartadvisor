using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Database
{
    public class DegreePlanRequirementResult
    {
        public ClassResult[] Classes { get; set; }

        public OrResult[] OrResults { get; set; }

        public RequirementsNode[] Regexes { get; set; }
    }
}
