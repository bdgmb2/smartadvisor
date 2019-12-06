using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Models.Database;

namespace WebApi.Services
{
    public interface IDatabaseService
    {
        Task<bool> HasUser(string userId);

        Task<UserNode> GetUser(string userID);

        Task<bool> AddUser(UserNode userObj);

        Task<bool> CreateDegreePlan(string userId, string dep, bool mgr, float year, int grp);

        Task DeleteDegreePlan(string userId, int grp);

        Task DeleteDegreeFromPlan(string userId, int grp, string dep, bool mgr, float year);

        Task<bool> AddDegreeToPlan(string userId, int grp, string dep, bool mgr, float year);

        Task<ClassResult> GetClass(string dName, string courseID);

        Task<IEnumerable<DegreePlanResult>> GetDegreePlans(string userId);

        Task<IEnumerable<DegreeResult>> GetDegrees();

        Task<DegreePlanRequirementResult> GetDegreePlan(string userId);

        Task<OrResult> ResolveOrNode(int orId);
    }
}
