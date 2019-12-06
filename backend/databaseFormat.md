(note, keep all values lowercase, req = requirement)
# Nodes

## Class
 - CourseId (string for regex)
 - Name
 - CreditHours
 - Repeatable
 - MajorOnly (true if restricted to it's field)
 - StillListed (set to false if no longer offered)
 - ReqHours (number of credit hours taken needed to take the class, 999 = graduate)
 - MaxHours (max hours taken before you can no longer take the class)
 - AdditionalReq (addition requirements that aren't a class, or don't match with a class)

Note: all special topics and generic courses always have still listed be false as the database should not recommend them. Other examples include the Oral Examination and Research.
Note2: If two classes depends on each other, the higher courseId will depend on the lower courseId.

### Creating
MATCH (d:Department { name: 'Comp Sci'} ) CREATE (:Class { courseId: '3500', name: 'Programming Languages And Translators', creditHours: 3, repeatable: false, majorOnly: false, stillListed: true, reqHours: 0, maxHours: 999, additionalReq: '' } )-[:PartOf]->(d)

empty:  
MATCH (d:Department { name: ''} ) CREATE (:Class { courseId: '', name: '', creditHours: 3, repeatable: false, majorOnly: false, stillListed: true, reqHours: 0, maxHours: 999, additionalReq: '' } )-[:PartOf]->(d)

### PreReq relation
MATCH (:Department { name: 'Comp Sci' })<-[:PartOf]-(c:Class {course Id: '1575'}), (:Department { name: 'Comp Sci' })<-[:PartOf]-(d:Class {course Id: '1570'}) CREATE (c)-[:PreReq { coReq: false, during: false, endYear: 2019, startYear: 2012, equivalents: false}]->(d)

### Changing a property
MATCH (:Department { name: 'Comp Sci' })<-[:PartOf]-(n:Class { name: 'Special Topics' }) SET n.repeatable = true

### Updating stillListed
MATCH (:Department { name: 'Comp Sci' })<-[:PartOf]-(c:Class) WHERE c.course Id IN ['1200', '1500', '1570', '1580', '1585', '1972', '1982', '2002', '2300', '2500', '3100', '3200', '3500', '3600', '3601', '3800', '4096', '4097', '4610', '4700', '5200', '5201', '5204', '5205', '5300', '5400', '5402', '5403', '5405', '5500', '5600', '5601', '5802', '6102', '6304', '6402', '6600', '6603', '6604'] SET c.stillListed = true

Note: Add NOT after where and set true to false and it will set all other classes to not listed.

## Requirements
 - Hours (number of needed hours)
 - Departments
 - CourseRegex

Course regex should be stored as a string as follows:  
.9.., 4700, ^3951, ..[1-5].  

This examples list means and class that has a 9 in the hundreds slot, or the 4700 class, or any class that has 1 though give in the tens slot, but not the 3951 class.  
AKA: ^ = not, . = any. Separate items by ', '  

Departments should be stored as a string as follows:  
Comp Sci|Mech Eng|Elec Eng  
if you separate regex by |, then you may put in multiple majors separated similarly. so if a regex was '..9.|4...|3..5' then it would accept any 90 level comp sci class, or any 4000 level Mech Eng class or any 3000 level Elec Eng class that had a 5 in the ones place.

### example query
MATCH (c:Class) WHERE c.course Id =~ '^(.9..)|(4700)&(^1972)$' RETURN c  
returns all 900 level comp sci classes except 1972. Also returns 4700

## Or (used for mapping PreReq)
Note: any class or degree that has a OR pre-req means it requires at least of the the classes that are a pre-req for this node.

## User
 - UserId

## Degree
 - isMajor (true is major, false if minor)
 - additionalReq (stores additional information about requirments)
 - StartYear (The year this degree started)
 - EndYear (The year this degree stopped being listed)
 - Hours (number of hours needed for this degree)
 (preReq from degree aren't needed and will be ignored)

## Department
 - Name (eg, AERO ENG or COMP SCI)

### creation example:
CREATE (:Department { name: 'Comp Eng' })

# Relations

## (Class or Student or Degree)->Department (partOf)

## Student->Degree (enroll)
 - groupId (used to group degrees together if multiple are sought)
 - year (The year they enrolled)

## Student->Class (passed)

## Class->Class OR Degree->Class OR Degree->Requirements (PreReq)
 - StartYear (add .5 for fall semester)
 - EndYear (add .5 for fall semester)
 - CoReq (-1 = not a co requeset. 0 = can be taken at the same time, 1 = must be taken at the same time )
 - Equivalents (true if class co-listings are accepted)

## Class->Class (coList)

# Queries

## fetch degree of a student
MATCH (:student { UserName: 'username' })-[:enroll]->(d:Degree)  
RETURN d.name, d.year

## fetch first layer of degree requirements
MATCH (:User { user Id: 'jssfg8' })-[:Enroll { group Id: 1 }]->(d:Degree)-[:PreReq]->(c:Class)-[:PartOf]->(e:Department), (z:Department) WHERE (d)-[:PartOf]->(z) RETURN z.name as degree, d.isMajor as isMajor, c.name as class, e.name as department, c.course Id as course Id, c.creditHours as hours, c.repeatable as repeatable, c.majorOnly as majorOnly, c.reqHours as reqHours, c.maxHours as maxHours, c.additionalReq, -1 as oid UNION MATCH (:User { user Id: 'jssfg8' })-[:Enroll { group Id: 1 }]->(d:Degree)-[:PreReq]->(c:Requirements), (z:Department) WHERE (d)-[:PartOf]->(z) RETURN z.name as degree, d.isMajor as isMajor, null as class, c.departments as department, c.courseRegx as course Id, c.hours as hours, null as repeatable, null as majorOnly, null as reqHours, null as maxHours, c.additionalReq, -1 as oid UNION MATCH (:User { user Id: 'jssfg8' })-[:Enroll { group Id: 1 }]->(d:Degree)-[:PreReq]->(o:OR)-[:PreReq]->(c:Class)-[:PartOf]->(e:Department), (z:Department) WHERE (d)-[:PartOf]->(z) RETURN z.name as degree, d.isMajor as isMajor, c.name as class, e.name as department, c.course Id as course Id, c.creditHours as hours, c.repeatable as repeatable, c.majorOnly as majorOnly, c.reqHours as reqHours, c.maxHours as maxHours, c.additionalReq,  Id(o) as oid UNION MATCH (:User { user Id: 'jssfg8' })-[:Enroll { group Id: 1 }]->(d:Degree)-[:PreReq]->(o:OR)-[:PreReq]->(c:Requirements), (z:Department) WHERE (d)-[:PartOf]->(z) RETURN z.name as degree, d.isMajor as isMajor, null as class, c.departments as department, c.courseRegx as course Id, c.hours as hours, null as repeatable, null as majorOnly, null as reqHours, null as maxHours, c.additionalReq,  Id(o) as oid

## CSV export
run the following query:  
MATCH (n)-[y]->(x) RETURN n, y, x  
then export the results as a csv
