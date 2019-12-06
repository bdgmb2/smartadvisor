using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Neo4jClient;
using Neo4jClient.Cypher;
using Newtonsoft.Json;
using WebApi.Models.Database;

namespace WebApi.Services
{
    public class DatabaseService : IDatabaseService
    {
        private readonly IGraphClient client;

        public DatabaseService(IGraphClient client)
        {
            this.client = client ?? throw new ArgumentNullException(nameof(client));
        }

        public async Task<bool> HasUser(string userId)
        {
            _ = userId ?? throw new ArgumentNullException(nameof(userId));

            return await this.GetUser(userId) != null;
        }

        public async Task<UserNode> GetUser(string userId)
        {
            _ = userId ?? throw new ArgumentNullException(nameof(userId));

            var query = this.client
                    .Cypher
                    .Match("(n:User)")
                    .Where<UserNode>(n => n.UserId == userId)
                    .Return<UserNode>("n")
                    .Limit(2);
            var results = await query.ResultsAsync;
            return results.SingleOrDefault();
        }

        public async Task<bool> AddUser(UserNode userObj)
        {
            _ = userObj ?? throw new ArgumentNullException(nameof(userObj));

            if (await this.HasUser(userObj.UserId))
            {
                return false;
            }

            // TODO: Make this Threadsafe
            var results = this.client
                .Cypher
                .Create("(user:User {newUser})")
                .WithParam("newUser", userObj);

            results.ExecuteWithoutResults();
            return true;
        }

        public async Task<bool> CreateDegreePlan(string userId, string dep, bool mgr, float year, int grp)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("message", nameof(userId));
            }

            if (string.IsNullOrEmpty(dep))
            {
                throw new ArgumentException("message", nameof(dep));
            }

            var query = this.client
                .Cypher
                .Match("(u:User)", "(d:Degree)-[:PartOf]->(a:Department)")
                .Where<UserNode, DepartmentNode, DegreeNode>((u, a, d) => u.UserId == userId && a.Name == dep && d.IsMajor == mgr)
                .Create("(u)-[e:Enroll { groupID: {grp}, year: {year} }]->(d)")
                .WithParam("grp", grp)
                .WithParam("year", year)
                .Return<int>("e.groupID");

            var results = await query.ResultsAsync;
            return results.Any();
        }

        public async Task DeleteDegreePlan(string userId, int grp)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("message", nameof(userId));
            }

            var query = this.client
                .Cypher
                .Match("(u:User { userID: {userId} })-[e:Enroll { groupID: {grp} }]->(d:Degree)-[:PartOf]->(a:Department)")
                .WithParam("userId", userId)
                .WithParam("grp", grp)
                .Delete("e");

            await query.ExecuteWithoutResultsAsync();
        }

        public async Task<ClassResult> GetClass(string dName, string courseID)
        {
            if (string.IsNullOrEmpty(dName))
            {
                throw new ArgumentException("message", nameof(dName));
            }

            if (string.IsNullOrEmpty(courseID))
            {
                throw new ArgumentException("message", nameof(courseID));
            }

            var query = this.client
                    .Cypher
                    .Match("(c:Class)-[:PartOf]->(d:Department)")
                    .Where<DepartmentNode, ClassNode>((d, c) => c.CourseId == courseID && d.Name == dName)
                    .Return((c, d) => new
                    {
                        Class = c.As<ClassNode>(),
                        Dept = d.As<DepartmentNode>(),
                    });
            var results = (await query.ResultsAsync).FirstOrDefault();
            return new ClassResult(results.Class, results.Dept);
        }

        public async Task<IEnumerable<DegreePlanResult>> GetDegreePlans(string userId)
        {
            _ = userId ?? throw new ArgumentException("message", nameof(userId));

            var query = this.client
                .Cypher
                .Match("(:User { userID: {userId} })-[e:Enroll]->(d:Degree)-[:PartOf]->(a:Department)")
                .WithParam("userId", userId)
                .Return((e, d, a) => new
                {
                    enroll = e.As<EnrollRelation>(),
                    degree = d.As<DegreeNode>(),
                    department = a.As<DepartmentNode>(),
                });

            var results = await query.ResultsAsync;
            return results.Select(r => new DegreePlanResult
            {
                GroupId = r.enroll.GroupId,
                IsMajor = r.degree.IsMajor,
                Year = r.degree.StartYear,
                Name = r.department.Name,
            });
        }

        public async Task<IEnumerable<DegreeResult>> GetDegrees()
        {
            var query = this.client
                .Cypher
                .Match("(d:Degree)-[:PartOf]->(a:Department)")
                .Return((d, a) => new
                {
                    d = d.As<DegreeNode>(),
                    a = a.As<DepartmentNode>(),
                });
            var results = await query.ResultsAsync;
            return results.Select(r => new DegreeResult
            {
                EndingYear = r.d.EndYear,
                IsMajor = r.d.IsMajor,
                Name = r.a.Name,
                StartingYear = r.d.StartYear,
            });
        }

        public async Task DeleteDegreeFromPlan(string userId, int grp, string dep, bool mgr, float year)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("message", nameof(userId));
            }

            if (string.IsNullOrEmpty(dep))
            {
                throw new ArgumentException("message", nameof(dep));
            }

            var query = this.client
                .Cypher
                .Match("(u:User)-[e:Enroll]->(d:Degree)-[:PartOf]->(a:Department)")
                .Where<UserNode, EnrollRelation, DegreeNode, DepartmentNode>((u, e, d, a) => u.UserId == userId && e.GroupId == grp && e.Year == year && d.IsMajor == mgr && a.Name == dep)
                .Delete("e");
            await query.ExecuteWithoutResultsAsync();
        }

        public async Task<bool> AddDegreeToPlan(string userId, int grp, string dep, bool mgr, float year)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("message", nameof(userId));
            }

            if (string.IsNullOrEmpty(dep))
            {
                throw new ArgumentException("message", nameof(dep));
            }

            var query = this.client
                .Cypher
                .Match("(u:User)-[e:Enroll]-(:Degree)", "(d:Degree)-[:PartOf]->(a:Department)")
                .Where<UserNode, EnrollRelation, DepartmentNode, DegreeNode>((u, e, a, d) => u.UserId == userId && e.GroupId == grp && a.Name == dep && d.IsMajor == mgr)
                .Create("(u)-[en:Enroll { groupID: {grp}, year: {year} }]->(d)")
                .WithParam("grp", grp)
                .WithParam("year", year)
                .Return<int>("en.groupID");

            var results = await query.ResultsAsync;
            return results.Any();
        }

        public async Task<OrResult> ResolveOrNode(int orId)
        {
            var query = this.client
                .Cypher
                .Match("(o:Or)-[:PreReq]->(req)")
                .Where<OrNode>((o) => o.Id == orId)
                .OptionalMatch("(req:Class)-[:PartOf]->(classDept:Department)")
                .With("classDept, [req] AS reqArray")
                .With("classDept, [n IN reqArray WHERE (n:Class)] AS classes, [n IN reqArray WHERE (n:Requirements)] AS reqs")
                .Return((classes, reqs, classDept) => new
                {
                    Classes = classes.As<List<ClassNode>>(),
                    ClassDept = classDept.As<DepartmentNode>(),
                    Requirements = reqs.As<List<RequirementsNode>>(),
                });

            var results = await query.ResultsAsync;
            var c = new List<ClassResult>();
            var r = new List<RequirementsNode>();
            foreach (var result in results)
            {
                if (result.Classes.Count > 0)
                {
                    c.Add(new ClassResult(result.Classes.First(), result.ClassDept));
                }

                r.AddRange(result.Requirements);
            }

            return new OrResult
            {
                Requirements = r,
                Classes = c,
            };
        }

        public async Task<DegreePlanRequirementResult> GetDegreePlan(string userId)
        {
            /*
                MATCH
                    (user:User)-[:Enroll]->(degree:Degree)-[:PreReq]->(req)
                WHERE
                    user.userID = "<blah>"
                OPTIONAL MATCH
                    (req:Or)-[:PreReq]->(subReq)
                OPTIONAL MATCH
                    (req:Class)-[:PartOf]->(classDept:Department)
                OPTIONAL MATCH
                    (subReq:Class)-[:PartOf]->(subClassDept:Department)
                WITH
                    req, [req] AS reqs, [subReq] AS subReqs, classDept, subClassDept
                WITH
                    req, classDept, subClassDept,
                    [n IN reqs WHERE (n:Class)] AS classes,
                    [n IN reqs WHERE (n:Requirements)] AS regexes,
                    [n IN subReqs WHERE (n:Class)] AS subReqClasses,
                    [n IN subReqs WHERE (n:Requirements)] AS subReqRegexes
                RETURN classes, classDept, regexes, subReqClasses, subClassDept, subReqRegexes, ID(req) AS reqId
             */
            var query = this.client
                .Cypher
                .Match("(user:User)-[:Enroll]->(degree:Degree)-[:PreReq]->(req)")
                .Where<UserNode>(user => user.UserId == userId)
                .OptionalMatch("(req:Or)-[:PreReq]->(subReq)")
                .OptionalMatch("(req:Class)-[:PartOf]->(classDept:Department)")
                .OptionalMatch("(subReq:Class)-[:PartOf]->(subClassDept:Department)")
                .With("req, [req] AS reqs, [subReq] AS subReqs, classDept, subClassDept")
                .With(" req, classDept, subClassDept, [n IN reqs WHERE(n: Class)] AS classes, " +
                "[n IN reqs WHERE(n: Requirements)] AS regexes, " +
                "[n IN subReqs WHERE(n: Class)] AS subReqClasses, " +
                "[n IN subReqs WHERE(n: Requirements)] AS subReqRegexes")
                .Return((classes, classDept, regexes, subReqClasses, subClassDept, subReqRegexes, req) => new
                {
                    Classes = classes.As<List<ClassNode>>(),
                    ClassDept = classDept.As<DepartmentNode>(),
                    Regexes = regexes.As<List<RequirementsNode>>(),
                    SubReqClasses = subReqClasses.As<List<ClassNode>>(),
                    SubClassDept = subClassDept.As<DepartmentNode>(),
                    subReqRegexes = subReqRegexes.As<List<RequirementsNode>>(),
                    reqId = (int)req.Id(),
                });

            var results = await query.ResultsAsync;
            var classResults = new List<ClassResult>();
            var orResults = new Dictionary<int, OrResult>();
            var regex = new List<RequirementsNode>();

            foreach (var result in results)
            {
                if (result.Classes.Count > 0)
                {
                    classResults.Add(new ClassResult(result.Classes.First(), result.ClassDept));
                }

                if (result.Regexes.Count > 0)
                {
                    regex.AddRange(result.Regexes);
                }

                if (result.SubReqClasses.Count > 0)
                {
                    if (orResults.ContainsKey(result.reqId))
                    {
                        orResults[result.reqId].Classes.Add(new ClassResult(result.SubReqClasses.First(), result.SubClassDept));
                    }
                    else
                    {
                        orResults.Add(result.reqId, new OrResult
                        {
                            Classes = new List<ClassResult>()
                            {
                                new ClassResult(result.SubReqClasses.First(), result.SubClassDept),
                            },
                            Requirements = new List<RequirementsNode>(),
                        });
                    }
                }

                if (result.subReqRegexes.Count > 0)
                {
                    if (orResults.ContainsKey(result.reqId))
                    {
                        orResults[result.reqId].Requirements.AddRange(result.subReqRegexes);
                    }
                    else
                    {
                        orResults.Add(result.reqId, new OrResult
                        {
                            Classes = new List<ClassResult>(),
                            Requirements = new List<RequirementsNode>(result.subReqRegexes),
                        });
                    }
                }
            }

            return new DegreePlanRequirementResult
            {
                Classes = classResults.ToArray(),
                OrResults = orResults.Values.ToArray(),
                Regexes = regex.ToArray(),
            };
        }
    }
}
