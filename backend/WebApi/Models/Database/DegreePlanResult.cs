using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Database
{
    public class DegreePlanResult
    {
        public bool IsMajor { get; set; }

        public float Year { get; set; }

        public string Name { get; set; }

        public int GroupId { get; set; }
    }
}
