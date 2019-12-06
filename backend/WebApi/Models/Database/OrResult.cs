using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Database
{
    public class OrResult
    {
        public List<ClassResult> Classes { get; set; }

        public List<RequirementsNode> Requirements { get; set; }
    }
}
