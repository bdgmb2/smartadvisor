using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace WebApi.Models.Database
{
    public class ClassResult
    {
        public ClassResult(ClassNode c, DepartmentNode d)
        {
            this.AdditionalRequirments = c.AdditionalRequirement;
            this.CourseId = c.CourseId;
            this.CreditHours = c.CreditHours;
            this.Deparment = d.Name;
            this.Repeatable = c.Repeatable;
            this.RequiredHours = c.RequiredHours;
            this.StillListed = c.StillListed;
            this.Name = c.Name;
        }

        public int CreditHours { get; set; }

        public bool Repeatable { get; set; }

        public int MaxHours { get; set; }

        public bool StillListed { get; set; }

        public string AdditionalRequirments { get; set; }

        public int RequiredHours { get; set; }

        public string Name { get; set; }

        public bool MajorOnly { get; set; }

        public string CourseId { get; set; }

        public string Deparment { get; set; }
    }
}
