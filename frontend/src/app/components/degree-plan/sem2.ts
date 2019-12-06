import { Course, Elective } from '../../models/course';

const toexport: Array<Array<Course | Elective>> = [
    [
        {
            type: 'Course',
            name: 'Freshman Engineering',
            department: 'Engineering',
            description: 'Examination of engineering degree programs available at Missouri S&T and career opportunities in engineering. Introduction to non-engineering majors and minors at Missouri S&T. Academic, professional and ethical expectations of the student and engineering professional. Introduction to campus facilities and resources for assisting in student success.',
            id: 'FE 1100',
            complete: true,
            inProg: false,
            credits: 3,
            corequisites: [],
            prerequisites: []
        },
        {
            type: 'Course',
            name: 'Exposition and Argumentation',
            department: 'English',
            description: 'Practice in college level essay writing.',
            id: 'ENGLISH 1120',
            complete: true,
            inProg: false,
            credits: 3,
            corequisites: [],
            prerequisites: []
        },
        {
            type: 'Course',
            name: 'Intro to Computation',
            department: 'Computer Science',
            description: 'This course provides a rigorous introduction to computational problem solving, thinking, and debugging, for those with little-to-no experience in computer science. Language-agnostic foundations focus on pseudo-code, flowcharts, and software-based code tracing, then build to programming in a high-level interpreted language, with a focus on data and modeling.',
            id: 'COMP SCI 1500',
            complete: true,
            inProg: false,
            credits: 3,
            corequisites: [],
            prerequisites: []
        },
        {
            type: 'Course',
            name: 'Calculus for Engineers I',
            department: 'Mathematics',
            description: 'Introduction to limits, continuity, differentiation and integration of algebraic and elementary transcendental functions. Applications in physical science and engineering. Credit will be given for only one of Math 1208 or Math 1214. Math 1214 may be accompanied by Math 1160 with Math department approval. Prerequisites: A grade of "C" or better in both Math 1160 and one of Math 1120 or Math 1140; or by placement exam.',
            id: 'MATH 1214',
            complete: true,
            inProg: false,
            credits: 4,
            corequisites: [],
            prerequisites: [ { description: 'MATH 1120 or MATH 1140, or by placement exam', class: [ 'MATH 1120', 'MATH 1140' ]}, { description: 'MATH 1160, or by placement exam', class: [ 'MATH 1160'] } ]
        },
        {
            type: 'Elective',
            name: 'Science',
            complete: true,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'General Biology',
                    department: 'Biological Sciences',
                    description: 'A comprehensive study of the general principles of the biology of plants, animals, and protists including population biology and regulation mechanisms. Prerequisite: Entrance requirements.',
                    credits: 3,
                    complete: false,
                    inProg: false,
                    id: 'BIO SCI 1113',
                    corequisites: [ { description: 'BIO SCI 1219', class: [ 'BIO SCI 1219' ] } ],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'General Chemistry',
                    department: 'Chemistry',
                    description: 'A comprehensive study of general chemistry concepts with focus on the atomic and molecular nature of matter. Fundamental scientific principles will be applied to solve chemistry problems and describe macroscopic physical properties. Prerequisite: Entrance requirements.',
                    id: 'CHEM 1310',
                    complete: false,
                    inProg: false,
                    credits: 3,
                    corequisites: [ { description: 'CHEM 1319', class: [ 'CHEM 1319' ] } ],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'Physical and Environmental Geology',
                    department: 'Geology',
                    description: 'Materials, structure, and surface features of the Earth and planets are studied in the context of the processes that continuously transform the Earth and affect management of Earth resources, hazards, engineering problems, and environmental challenges. Prerequisite: Entrance requirements. (Co-listed with Geo Eng 1150).',
                    id: 'GEOLOGY 1110',
                    complete: false,
                    inProg: false,
                    credits: 2,
                    corequisites: [ { description: 'GEOLOGY 1119', class: [ 'GEOLOGY 1119' ] } ],
                    prerequisites: []
                }
            ]
        }
    ],
    [
        {
            type: 'Course',
            name: 'Intro to C++',
            department: 'Computer Science',
            description: 'Programming design and development using C++. Emphasis placed on problem solving methods using good programming practices and algorithm design and development. Topics included are syntax/semantics, logical, relational and arithmetic operators, decision branching, loops, functions, file I/O, arrays, output formatting, C-strings, and an introduction to Object-Oriented Programming including the development and use of classes. Prerequisite: Accompanied by Comp Sci 1580.',
            id: 'COMP SCI 1570',
            complete: true,
            inProg: false,
            credits: 3,
            corequisites: [ { description: 'COMP SCI 1575', class: [ 'COMP SCI 1575' ] } ],
            prerequisites: []
        },
        {
            type: 'Course',
            name: 'Intro to C++ Lab',
            department: 'Computer Science',
            description: 'Practical applications of concepts learned in Computer Science 1570. Hands-on instruction in C++ developing, debugging, and testing programming projects. Prerequisite: Accompanied by Comp Sci 1570.',
            id: 'COMP SCI 1580',
            complete: true,
            inProg: false,
            credits: 1,
            corequisites: [ { description: 'COMP SCI 1570', class: [ 'COMP SCI 1570' ] } ],
            prerequisites: []
        },
        {
            type: 'Course',
            name: 'Discrete Mathematics',
            department: 'Computer Science',
            description: 'A rigorous treatment of topics from discrete mathematics which are essential to computer science. Principal topics include: formal logic (propositional & predicate), proof techniques, mathematical induction, program correctness, sets, combinatorics, probability, relations, functions, matrices, graph theory and graph algorithms. Prerequisite: A grade of "C" or better in both Comp Sci 1570 and one of Math 1120, Math 1140, Math 1208, and Math 1214.',
            id: 'COMP SCI 1200',
            complete: true,
            inProg: false,
            credits: 3,
            corequisites: [],
            prerequisites: [ { description: 'COMP SCI 1570', class: [ 'COMP SCI 1570' ] }, { description: 'MATH 1214', class: [ 'MATH 1214' ] } ]
        },
        {
            type: 'Course',
            name: 'Calculus for Engineers II',
            department: 'Mathematics',
            description: 'Continuation of Math 1214. Transcendental functions, techniques of integration, sequences, series including power series, polar coordinates, polar and parametric equations. Applications in physical science and engineering. Credit will be given for only one of Math 1215 or Math 1221. Prerequisites: Math 1160 and either Math 1208 or Math 1214 both with a grade of "C" or better; or by placement exam.',
            id: 'MATH 1215',
            complete: false,
            inProg: true,
            credits: 4,
            corequisites: [],
            prerequisites: [ { description: 'MATH 1214 or MATH 1208, or by placement exam', class: [ 'MATH 1214', 'MATH 1208' ] }, { description: 'MATH 1160, or by placement exam', class: [ 'MATH 1160' ] } ]
        },
        {
            type: 'Course',
            name: 'Writing and Research',
            department: 'English',
            description: 'Practice in techniques of analytical writing and in methods of research. Prerequisite: English 1120.',
            id: 'ENGLISH 1160',
            complete: true,
            inProg: false,
            credits: 3,
            corequisites: [],
            prerequisites: [ { description: 'ENGLISH 1120', class: [ 'ENGLISH 1120' ] } ]
        },
        {
            type: 'Elective',
            name: 'Social Science',
            complete: true,
            possibleCourses: [
            {
                type: 'Course',
                name: 'General Psychology',
                department: 'Psychology',
                description: 'An introduction to the science of the human mind and behavior. Topics include brain structure and function, human development, learning and memory, motivation, emotion, personality and psychological health, psychological disorders and their treatment, and social cognition and human relationships. PSYCH 1101 - MOTR PSYC 100: General Psychology',
                id: 'PSYCH 1101',
                complete: false,
                inProg: false,
                credits: 3,
                corequisites: [],
                prerequisites: []
            },
            {
                type: 'Course',
                name: 'Principles of Microeconomics',
                department: 'Economics',
                description: 'An examination of how resources and products are priced and how income is distributed within various types of market structures. ECON 1100 - MOTR ECON 102: Introduction to Microeconomics',
                credits: 3,
                complete: false,
                inProg: false,
                id: 'ECON 1100',
                corequisites: [],
                prerequisites: []
            },
            {
                type: 'Course',
                name: 'Principles of Macroeconomics',
                department: 'Economics',
                description: 'A study of alternative strategies for managing the U.S. economy within a global environment, to attain the goals of full employment, stability and growth. ECON 1200 - MOTR ECON 101: Introduction to Macroeconomics',
                credits: 3,
                id: 'ECON 1200',
                complete: false,
                inProg: false,
                corequisites: [],
                prerequisites: []
            }
            ]
        }
    ],
    [
        {
            type: 'Course',
            name: 'Data Structures',
            department: 'Computer Science',
            description: 'A continuation of Object-Oriented Programming, with emphasis on the efficient organization of data through Abstract Data Types and Data Structures. Topics include Linked Lists, Vectors, Stacks, Queues, Trees, Hash Tables, Graphs and their use in a variety of algorithms. Recursive programming techniques are also covered. This course is programming intensive. Prerequisite: Grade of "C" or better in Comp Sci 1570.',
            credits: 3,
            id: 'COMP SCI 1575',
            complete: false,
            inProg: true,
            corequisites: [ { description: 'COMP SCI 1585', class: [ 'COMP SCI 1585' ] } ],
            prerequisites: [ { description: 'COMP SCI 1570', class: [ 'COMP SCI 1570' ] } ]
        },
        {
            type: 'Course',
            name: 'Data Structures Laboratory',
            department: 'Computer Science',
            description: 'Hands-on instruction in programming development tools such as version control systems, integrated development environments, debuggers, profilers, and event-based programming environments. Exercises will complement the concepts presented in Comp Sci 1575. Prerequisite: Preceded or accompanied by Comp Sci 1575.',
            credits: 1,
            id: 'COMP SCI 1585',
            complete: false,
            inProg: true,
            corequisites: [ { description: 'COMP SCI 1575', class: [ 'COMP SCI 1575' ] } ],
            prerequisites: [ { description: 'COMP SCI 1570', class: [ 'COMP SCI 1570' ] } ]
        },
        {
            type: 'Course',
            name: 'Digital Logic',
            department: 'Computer Engineering',
            description: 'Examines the core components from which digital systems are designed, constructed, and analyzed. Topics include binary numbers, truth tables, Boolean algebra, Karnaugh maps, combinational logic, digital components, CMOS, programmable logic devices, and sequential circuits. Prerequisites: Accompanied by Comp Eng 2211.',
            credits: 3,
            id: 'COMP ENG 2210',
            complete: false,
            inProg: true,
            corequisites: [],
            prerequisites: []
        },
        {
            type: 'Elective',
            name: 'Statistics',
            complete: true,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'Applied Engineering Statistics',
                    department: 'Statistics',
                    description: 'An introduction to applied statistical methods in engineering dealing with basic probability, estimation, tests of hypotheses, regression, design of experiments and control charts. Statistical computer packages will be used in connection with some of the material studies. Credit will be given for only one of Stat 3111, 3113, 3115 or 3117. Prerequisite: Math 1215 or 1221 with a grade of "C" or better.',
                    id: 'STAT 3113',
                    complete: false,
                    inProg: false,
                    credits: 3,
                    corequisites: [],
                    prerequisites: [ { description: 'MATH 1215 or MATH 1221', class: [ 'MATH 1215', 'MATH 1221' ] } ]
                },
                {
                    type: 'Course',
                    name: 'Engineering Statistics',
                    department: 'Statistics',
                    description: 'An introduction to statistical methods in engineering and the physical sciences dealing with basic probability, distribution theory, confidence intervals, significance tests, and sampling. Credit will be given for only one of Stat 3111, 3113, 3115 or 3117. Prerequisite: Math 1215 or 1221 with a grade of "C" or better.',
                    id: 'STAT 3115',
                    complete: false,
                    inProg: false,
                    credits: 3,
                    corequisites: [],
                    prerequisites: [ { description: 'MATH 1215 or MATH 1221', class: [ 'MATH 1215', 'MATH 1221' ] } ]
                },
                {
                    type: 'Course',
                    name: 'Introduction to Probability And Statistics',
                    department: 'Statistics',
                    description: 'Introduction to probability, distribution theory, statistical inference, with applications to physical and engineering sciences. Probability, probability and joint distributions, functions of random variables, system reliability, point and interval estimation, testing hypotheses, regression analysis. Credit will be given for only one of Stat 3111, 3113, 3115, or 3117. Prerequisite: Math 2222 with a grade of "C" or better.',
                    id: 'STAT 3117',
                    complete: false,
                    inProg: false,
                    credits: 3,
                    corequisites: [],
                    prerequisites: [ { description: 'MATH 2222', class: [ 'MATH 2222' ] } ]
                },
                {
                    type: 'Course',
                    name: 'Probability And Statistics',
                    department: 'Statistics',
                    description: 'Introduction to the theory of probability and its applications, sample spaces, random variables, binomial, Poisson, normal distributions, derived distributions, and moment generating functions. Prerequisite: Math 2222.',
                    id: 'STAT 5643',
                    complete: false,
                    inProg: false,
                    credits: 3,
                    corequisites: [],
                    prerequisites: [ { description: 'MATH 2222', class: [ 'MATH 2222' ] } ]
                }
            ]
        },
        {
            type: 'Course',
            name: 'Engineering Physics I',
            department: 'Physics',
            description: 'An introduction to mechanics, with an emphasis on topics needed by engineering students, including kinematics, dynamics, statics, and energetics. Prerequisite: Math 1208 or 1214. PHYSICS 1135 - MOTR PHYS 200L: Advanced Physics I with Lab',
            id: 'PHYSICS 1135',
            complete: false,
            inProg: true,
            credits: 4,
            corequisites: [],
            prerequisites: [ { description: 'MATH 1208 or 1214', class: [ 'MATH 1208', 'MATH 1214' ] } ]
        },
        {
            type: 'Elective',
            name: 'Computer Science 5000',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'Analysis of Algorithms',
                    department: 'Computer Science',
                    description: 'The purpose of this course is to teach the techniques needed to analyze algorithms. The focus of the presentation is on the practical application of these techniques to such as sorting, backtracking, and graph algorithms. Prerequisite: A "C" or better grade in Comp Sci 2500.',
                    credits: 3,
                    id: 'COMP SCI 5200',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 2500', class: [ 'COMP SCI 2500' ] } ]
                },

                {
                    type: 'Course',
                    name: 'Introduction to Artificial Intelligence',
                    department: 'Computer Science',
                    description: 'A modern introduction to AI, covering important topics of current interest such as search algorithms, heuristics, game trees, knowledge representation, reasoning, computational intelligence, and machine learning. Students will implement course concepts covering selected AI topics. Prerequisite: A "C" or better grade in Comp Sci 2500.',
                    credits: 3,
                    id: 'COMP SCI 5400',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 2500', class: [ 'COMP SCI 2500' ] } ]
                },

                {
                    type: 'Course',
                    name: 'The Structure of a Compiler',
                    department: 'Computer Science',
                    description: 'Review of Backus normal form language descriptors and basic parsing concepts. Polish and matrix notation as intermediate forms, and target code representation. Introduction to the basic building blocks of a compiler: syntax scanning, expression translation, symbol table manipulation, code generation, local optimization, and storage allocation. Prerequisite: A "C" or better grade in both Comp Sci 3500 and Comp Sci 2500.',
                    credits: 3,
                    id: 'COMP SCI 5500',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 3500 and COMP SCI 2500', class: [ 'COMP SCI 3500', 'COMP SCI 2500' ] } ]
                }
            ]
        },
    ],
    [
        {
            type: 'Course',
            name: 'Theory of Computer Science',
            department: 'Computer Science',
            description: 'This course will cover the theoretical underpinnings of computer science. In particular, this course will cover the following topics: basic computability and formal language concepts, regular languages, context free languages, recursively-enumerable languages, and classes P, NP, and NP-completeness. Prerequisite: A grade of "C" or better in both Comp Sci 1200 and Comp Sci 1575.',
            credits: 3,
            id: 'COMP SCI 2200',
            complete: false,
            inProg: false,
            corequisites: [],
            prerequisites: [ { description: 'COMP SCI 1200', class: [ 'COMP SCI 1200' ] }, { description: 'COMP SCI 1575', class: [ 'COMP SCI 1575' ] } ]
        },
        {
            type: 'Course',
            name: 'Algorithms',
            department: 'Computer Science',
            description: 'Students will solve recurrence relations, analyze algorithms for correctness and time/space complexity, apply these analysis techniques to fundamental dynamic programming, greedy, shortest-path, minimal spanning trees, and maximum flow algorithms and validate these analyses through programming. Prerequisite: A grade of "C" or better in both Comp Sci 1200 and Comp Sci 1575; preceded by a grade of "C" or better in either Math 1208 or Math 1214, or accompanied by either Math 1208 or Math 1214.',
            credits: 3,
            id: 'COMP SCI 2500',
            complete: false,
            inProg: false,
            corequisites: [ { description: 'MATH 1208 or MATH 1214', class: [ 'MATH 1208', 'MATH 1214' ] } ],
            prerequisites: [ { description: 'COMP SCI 1200', class: [ 'COMP SCI 1200' ] },
                            { description: 'COMP SCI 1575', class: [ 'COMP SCI 1575' ] },
                            { description: 'MATH 1208 or MATH 1214', class: [ 'MATH 1208', 'MATH 1214' ] } ]
        },
        {
            type: 'Course',
            name: 'Introduction to Microcontrollers and Embedded System Design',
            department: 'Computer Engineering',
            description: 'Microcontroller-based digital system design methodology and techniques. Topics include basic machine organization, interface design, and C and assembly language programming for real-time embedded systems. Prerequisites: COMP ENG 2210 and COMP SCI 1570 (or programming equivalent) each with grade of "C" or better.',
            credits: 3,
            id: 'COMP ENG 3150',
            complete: false,
            inProg: false,
            corequisites: [],
            prerequisites: [ { description: 'COMP SCI 1570', class: [ 'COMP SCI 1570' ] }, { description: 'COMP ENG 2210', class: [ 'COMP ENG 2210' ] } ]
        },
        {
            type: 'Course',
            name: 'Engineering Physics II',
            department: 'Physics',
            description: 'An introduction to electricity, magnetism, and light, with emphasis on topics needed by engineering students. Prerequisites: Physics 1135 or Physics 1111, Math 1221 or Math 1215.',
            id: 'PHYSICS 2135',
            complete: false,
            inProg: false,
            credits: 4,
            corequisites: [],
            prerequisites: [ { description: 'PHYSICS 1135 or PHYSICS 1111', class: [ 'PHYSICS 1135', 'PHYSICS 1111' ] },
                            { description: 'MATH 1221 or 1215', class: [ 'MATH 1221', 'MATH 1215' ] } ]
        },
        {
            type: 'Elective',
            name: 'Literature',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'British Literature I: The Beginnings To 1800',
                    department: 'English',
                    description: 'A survey of works and authors that explores the way these works represent the chronological period and express the individual concerns and techniques of those authors. ENGLISH 1211 - MOTR LITR 102: British Literature',
                    id: 'ENGLISH 1211',
                    complete: false,
                    inProg: false,
                    credits: 3,
                    corequisites: [],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'British Literature II 1800 To Present',
                    department: 'English',
                    description: 'A survey of works and authors that explores the way these works represent the chronological period and express the individual concerns and techniques of those authors. ENGLISH 1212 - MOTR LITR 102: British Literature',
                    id: 'ENGLISH 1212',
                    complete: false,
                    inProg: false,
                    credits: 3,
                    corequisites: [],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'World Literature I: From The Beginnings To The Renaissance',
                    department: 'English',
                    description: 'A survey of representative works and authors from the worlds cultures. (Excludes British and American works).',
                    id: 'ENGLISH 1231',
                    complete: false,
                    inProg: false,
                    credits: 3,
                    corequisites: [],
                    prerequisites: []
                }
            ]
        }
    ],
    [
        {
            type: 'Course',
            name: 'File Structures and Introduction to Database Systems',
            department: 'Computer Science',
            description: 'Course covers major topics in file structures and database systems including techniques for disk access and organization, record and file structures, index structures, sequential file, dense/sparse and secondary indexes, B-trees, range queries, insertion/deletion, hash tables, fundamentals of database systems, the ER model, relational model, algebra and SQL. Prerequisite: A grade of "C" or better in Comp Sci 1575.',
            credits: 3,
            id: 'COMP SCI 2300',
            complete: false,
            inProg: false,
            corequisites: [],
            prerequisites: [ { description: 'COMP SCI 1575', class: [ 'COMP SCI 1575' ] } ]
        },
        {
            type: 'Course',
            name: 'Introduction to Operating Systems',
            department: 'Computer Science',
            description: 'This course teaches the concepts, structure, and mechanisms of Operating Systems. Topics include process management, concurrency, synchronization, deadlock, multithreading, memory management, scheduling, and internetworking. Special emphasis is given to Unix and its modern-day derivatives. Prerequisites: A grade of "C" or better in both Comp Sci 1575 and Comp Eng 2210.',
            credits: 3,
            id: 'COMP SCI 3800',
            complete: false,
            inProg: false,
            corequisites: [],
            prerequisites: [ { description: 'COMP SCI 1575 and COMP ENG 2210', class: [ 'COMP SCI 1575', 'COMP ENG 2210' ] } ]
        },
        {
            type: 'Course',
            name: 'Linear Algebra',
            department: 'Computer Science',
            description: 'Systems of linear equations, matrices, vector spaces, inner products, linear transformations, determinants, and eigenvalues are studied. Prerequisite: Math 1215 or 1221 or 2222 with a grade of "C" or better.',
            credits: 3,
            id: 'MATH 3108',
            complete: false,
            inProg: false,
            corequisites: [],
            prerequisites: [ { description: 'MATH 1215 or MATH 1221 or MATH 2222', class: [ 'MATH 1215', 'MATH 1221', 'MATH 2222' ] } ]
        },
        {
            type: 'Elective',
            name: 'Ethics',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'Engineering Ethics',
                    department: 'Philosophy',
                    description: 'Engineering ethics, examines major ethical issues facing engineers in the practice of their profession: the problem of professionalism and a code of ethics; the process of ethical decision-making in different working environments; the rights, duties, and conflicting responsibilities of engineers. Prerequisite: Sophomore standing or above.',
                    credits: 3,
                    id: 'PHILOS 3225',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'Sophomore standing or above.', class: [] } ]
                },
                {
                    type: 'Course',
                    name: 'Business Ethics',
                    department: 'Philosophy',
                    description: 'Develop ethical concepts relevant to deciding the moral issues that arise in business. Topics include: Economic systems, government regulations, relations to external groups and environment, advertising, product safety and liability, worker safety and rights, rights and responsibilities of business professionals. Prerequisite: Sophomore standing or above.',
                    credits: 3,
                    id: 'PHILOS 3235',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'Sophomore standing or above.', class: [] } ]
                }
            ]
        },
        {
            type: 'Elective',
            name: 'History',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'Modern Western Civilization',
                    department: 'History',
                    description: 'A continuation of History 1100 to the present with special emphasis on the philosophical, political, social, and economic backgrounds of modern society. HISTORY 1200 - MOTR WCIV 102: Western Civilization II',
                    credits: 3,
                    id: 'HISTORY 1200',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'American History To 1877',
                    department: 'History',
                    description: 'Survey of the history of the American colonies and United States from colonial times through Reconstruction. HISTORY 1300 - MOTR HIST 101: American History I',
                    credits: 3,
                    id: 'HISTORY 1300',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'American History Since 1877',
                    department: 'History',
                    description: 'Survey of the history of America since Reconstruction. HISTORY 1310 - MOTR HIST 102: American History II',
                    credits: 3,
                    id: 'HISTORY 1310',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'American Government',
                    department: 'Political Science',
                    description: 'National, state and local government in the United States with special emphasis on political behavior and the institutions that determine and execute public policy. Topics include basic structure of American government, (i.e., democracy, the Constitution, the branches of government), as well as citizenship, parties, pressure groups and American economic policy. The course views government in its relation to its people, its services and protection. POL SCI 1200 - MOTR POSC 101: American Government',
                    credits: 3,
                    id: 'POL SCI 1200',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: []
                }
            ]
        }
    ],
    [
        {
            type: 'Course',
            name: 'Programming Languages And Translators',
            department: 'Computer Science',
            description: 'Covers basic design of programming languages, compilers and interpreters. The concepts of syntax, variables, expressions, types, scope, functions, procedures, statements, I/O, exception handling and concurrency are introduced. The manner in which various programming languages handle these concepts is discussed. Prerequisite: A "C" or better grade in Comp Sci 2200.',
            credits: 3,
            id: 'COMP SCI 3500',
            complete: false,
            inProg: false,
            corequisites: [],
            prerequisites: [ { description: 'COMP SCI 3500', class: [ 'COMP SCI 3500' ] } ]
        },
        {
            type: 'Course',
            name: 'Computer Networks',
            department: 'Computer Science',
            description: 'This course covers general principles of computer networking, focusing primarily on internet protocols. It covers the TCP/IP stack, with the application layer first, moving down through link and physical layers. Topics include network virtualization, security, wireless, and mobile networks, with extensive live protocol analysis. Coursework is project based. Prerequisites: A grade of "C" or better in Comp Sci 3800.',
            credits: 3,
            id: 'COMP SCI 3610',
            complete: false,
            inProg: false,
            corequisites: [],
            prerequisites: [ { description: 'COMP SCI 3610', class: [ 'COMP SCI 3610' ] } ]
        },
        {
            type: 'Elective',
            name: 'Computer Science',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'Java and Object Oriented Design',
                    department: 'Computer Science',
                    description: 'This course covers general principles of computer networking, focusing primarily on internet protocols. It covers the TCP/IP stack, with the application layer first, moving down through link and physical layers. Topics include network virtualization, security, wireless, and mobile networks, with extensive live protocol analysis. Coursework is project based. Prerequisites: A grade of "C" or better in Comp Sci 3800.',
                    credits: 3,
                    id: 'COMP SCI 2501',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 1570', class: [ 'COMP SCI 1570' ] } ]
                },
                {
                    type: 'Course',
                    name: 'Software Engineering',
                    department: 'Computer Science',
                    description: 'Development of methodologies useful in the software engineering classical life cycle. This includes: requirements, design, implementation, and testing phases. These methodologies are reinforced through utilization of a CASE tool and a group project. Prerequisite: A "C" or better grade in Comp Sci 2500 and at least Junior standing.',
                    credits: 3,
                    id: 'COMP SCI 3100',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 2500 and at least Junior Standing', class: [ 'COMP SCI 2500' ] } ]
                },
                {
                    type: 'Course',
                    name: 'Digital Forensics',
                    department: 'Computer Science',
                    description: 'Planning/managing incidents and response related to digital forensics; identifying, collecting, and preserving digital evidence; live/dead approaches covering systems as a whole emphasizing file system forensics; analysis and interpretation of artifacts culminating in a final project consisting of a collection, analysis, and report; legal and ethical issues. Prerequisites: A "C" or better grade in both COMP SCI 3600 and COMP SCI 3800.',
                    credits: 3,
                    id: 'COMP SCI 3601',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 3600', class: [ 'COMP SCI 2500' ] },
                                    { description: 'COMP SCI 3800', class: [ 'COMP SCI 3800' ] } ]
                }
            ]
        },
        {
            type: 'Elective',
            name: 'Science',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'General Biology',
                    department: 'Biological Sciences',
                    description: 'A comprehensive study of the general principles of the biology of plants, animals, and protists including population biology and regulation mechanisms. Prerequisite: Entrance requirements.',
                    credits: 3,
                    id: 'BIO SCI 1113',
                    complete: false,
                    inProg: false,
                    corequisites: [ { description: 'BIO SCI 1219', class: [ 'BIO SCI 1219' ] } ],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'General Chemistry',
                    department: 'Chemistry',
                    description: 'A comprehensive study of general chemistry concepts with focus on the atomic and molecular nature of matter. Fundamental scientific principles will be applied to solve chemistry problems and describe macroscopic physical properties. Prerequisite: Entrance requirements.',
                    id: 'CHEM 1310',
                    complete: false,
                    inProg: false,
                    credits: 3,
                    corequisites: [ { description: 'CHEM 1319', class: [ 'CHEM 1319' ] } ],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'Physical and Environmental Geology',
                    department: 'Geology',
                    description: 'Materials, structure, and surface features of the Earth and planets are studied in the context of the processes that continuously transform the Earth and affect management of Earth resources, hazards, engineering problems, and environmental challenges. Prerequisite: Entrance requirements. (Co-listed with Geo Eng 1150).',
                    id: 'GEOLOGY 1110',
                    complete: false,
                    inProg: false,
                    credits: 2,
                    corequisites: [ { description: 'GEOLOGY 1119', class: [ 'GEOLOGY 1119' ] } ],
                    prerequisites: []
                }
            ]
        },
        {
            type: 'Elective',
            name: 'Speech',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'Principles of Speech',
                    department: 'Speech & Media Studies',
                    description: 'A study of the arts of expression, oral communication, and listening (theory and practice); effective interaction of speech, speaker, listener, and occasion. Prerequisite: Entrance requirements. SP&M S 1185 - MOTR COMM 110: Fundamentals of Public Speaking',
                    credits: 3,
                    complete: false,
                    inProg: false,
                    id: 'SP&M 1185',
                    corequisites: [],
                    prerequisites: []
                }

            ]
        }
    ],
    [
        {
            type: 'Course',
            name: 'Software Engineering Capstone I',
            department: 'Computer Science',
            description: 'This is the first course in the Software Engineering Capstone sequence covering the Software Life Cycle. Students will learn about software engineering, and work in teams to spec, design, prototype, implement, test, document, deploy, and maintain a software system. This course is programming intensive, writing emphasized and addresses ethical considerations. Prerequisites: A grade of "C" or better in all of Comp Sci 2300, Comp Sci 2500, Comp Sci 3610, and in one of Philos 3225, Philos 3235, Philos 4340, or Philos 4368.',
            credits: 3,
            id: 'COMP SCI 4090',
            complete: false,
            inProg: false,
            corequisites: [],
            prerequisites: [ { description: 'COMP SCI 2390', class: [ 'COMP SCI 2390' ] },
                            { description: 'COMP SCI 2500', class: [ 'COMP SCI 2500' ] },
                            { description: 'COMP SCI 3610', class: [ 'COMP SCI 3610' ] },
                            { description: 'PHILOS 3225, PHILOS 3235, PHILOS 4340 or PHILOS 4368', class: [ 'PHILOS 3225', 'PHILOS 3235', 'PHILOS 4340', 'PHILOS 4368' ] } ]
        },
        {
            type: 'Course',
            name: 'Introduction to Computer Security',
            department: 'Computer Science',
            description: 'This course encompasses threats and vulnerabilities, trust and security policies, and enforcement. Specific topics include access control, risk management, systems and applications life cycle, physical security, key management, transmission security, and cryptography. Prerequisite: A "C" or better grade in Comp Sci 2500.',
            credits: 3,
            id: 'COMP SCI 4610',
            complete: false,
            inProg: false,
            corequisites: [],
            prerequisites: [ { description: 'COMP SCI 2500', class: [ 'COMP SCI 2500' ] } ]
        },
        {
            type: 'Elective',
            name: 'Computer Science 5000',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'Analysis of Algorithms',
                    department: 'Computer Science',
                    description: 'The purpose of this course is to teach the techniques needed to analyze algorithms. The focus of the presentation is on the practical application of these techniques to such as sorting, backtracking, and graph algorithms. Prerequisite: A "C" or better grade in Comp Sci 2500.',
                    credits: 3,
                    id: 'COMP SCI 5200',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 2500', class: [ 'COMP SCI 2500' ] } ]
                },

                {
                    type: 'Course',
                    name: 'Introduction to Artificial Intelligence',
                    department: 'Computer Science',
                    description: 'A modern introduction to AI, covering important topics of current interest such as search algorithms, heuristics, game trees, knowledge representation, reasoning, computational intelligence, and machine learning. Students will implement course concepts covering selected AI topics. Prerequisite: A "C" or better grade in Comp Sci 2500.',
                    credits: 3,
                    id: 'COMP SCI 5400',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 2500', class: [ 'COMP SCI 2500' ] } ]
                },

                {
                    type: 'Course',
                    name: 'The Structure of a Compiler',
                    department: 'Computer Science',
                    description: 'Review of Backus normal form language descriptors and basic parsing concepts. Polish and matrix notation as intermediate forms, and target code representation. Introduction to the basic building blocks of a compiler: syntax scanning, expression translation, symbol table manipulation, code generation, local optimization, and storage allocation. Prerequisite: A "C" or better grade in both Comp Sci 3500 and Comp Sci 2500.',
                    credits: 3,
                    id: 'COMP SCI 5500',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 3500', class: [ 'COMP SCI 3500' ] },
                                    { description: 'COMP SCI 2500', class: [ 'COMP SCI 2500' ] } ]
                }
            ]
        },
        {
            type: 'Elective',
            name: 'Social Science',
            complete: false,
            possibleCourses: [
            {
                type: 'Course',
                name: 'General Psychology',
                department: 'Psychology',
                description: 'An introduction to the science of the human mind and behavior. Topics include brain structure and function, human development, learning and memory, motivation, emotion, personality and psychological health, psychological disorders and their treatment, and social cognition and human relationships. PSYCH 1101 - MOTR PSYC 100: General Psychology',
                credits: 3,
                id: 'PSYCH 1101',
                complete: false,
                inProg: false,
                corequisites: [],
                prerequisites: []
            },
            {
                type: 'Course',
                name: 'Principles of Microeconomics',
                department: 'Economics',
                description: 'An examination of how resources and products are priced and how income is distributed within various types of market structures. ECON 1100 - MOTR ECON 102: Introduction to Microeconomics',
                credits: 3,
                id: 'ECON 1100',
                complete: false,
                inProg: false,
                corequisites: [],
                prerequisites: []
            },
            {
                type: 'Course',
                name: 'Principles of Macroeconomics',
                department: 'Economics',
                description: 'A study of alternative strategies for managing the U.S. economy within a global environment, to attain the goals of full employment, stability and growth. ECON 1200 - MOTR ECON 101: Introduction to Macroeconomics',
                credits: 3,
                id: 'ECON 1200',
                complete: false,
                inProg: false,
                corequisites: [],
                prerequisites: []
            }
            ]
        },
        {
            type: 'Elective',
            name: 'Science',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'General Biology',
                    department: 'Biological Sciences',
                    description: 'A comprehensive study of the general principles of the biology of plants, animals, and protists including population biology and regulation mechanisms. Prerequisite: Entrance requirements.',
                    credits: 3,
                    id: 'BIO SCI 1113',
                    complete: false,
                    inProg: false,
                    corequisites: [ { description: 'BIO SCI 1219', class: [ 'BIO SCI 1219' ] } ],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'General Chemistry',
                    department: 'Chemistry',
                    description: 'A comprehensive study of general chemistry concepts with focus on the atomic and molecular nature of matter. Fundamental scientific principles will be applied to solve chemistry problems and describe macroscopic physical properties. Prerequisite: Entrance requirements.',
                    id: 'CHEM 1310',
                    complete: false,
                    inProg: false,
                    credits: 3,
                    corequisites: [ { description: 'CHEM 1319', class: [ 'CHEM 1319' ] } ],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'Physical and Environmental Geology',
                    department: 'Geology',
                    description: 'Materials, structure, and surface features of the Earth and planets are studied in the context of the processes that continuously transform the Earth and affect management of Earth resources, hazards, engineering problems, and environmental challenges. Prerequisite: Entrance requirements. (Co-listed with Geo Eng 1150).',
                    id: 'GEOLOGY 1110',
                    complete: false,
                    inProg: false,
                    credits: 2,
                    corequisites: [ { description: 'GEOLOGY 1119', class: [ 'GEOLOGY 1119' ] } ],
                    prerequisites: []
                }
            ]
        }
    ],
    [
        {
            type: 'Course',
            name: 'Software Engineering Capstone II',
            department: 'Computer Science',
            description: 'This is the first course in the Software Engineering Capstone sequence covering the Software Life Cycle. Students will learn about software engineering, and work in teams to spec, design, prototype, implement, test, document, deploy, and maintain a software system. This course is programming intensive, writing emphasized and addresses ethical considerations. Prerequisites: A grade of "C" or better in all of Comp Sci 2300, Comp Sci 2500, Comp Sci 3610, and in one of Philos 3225, Philos 3235, Philos 4340, or Philos 4368.',
            credits: 3,
            id: 'COMP SCI 4091',
            complete: false,
            inProg: false,
            corequisites: [],
            prerequisites: [ { description: 'COMP SCI 4090 and COMP SCI 4610', class: [ 'COMP SCI 4090', 'COMP SCI 4610' ] } ]
        },
        {
            type: 'Elective',
            name: 'Computer Science 5000',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'Analysis of Algorithms',
                    department: 'Computer Science',
                    description: 'The purpose of this course is to teach the techniques needed to analyze algorithms. The focus of the presentation is on the practical application of these techniques to such as sorting, backtracking, and graph algorithms. Prerequisite: A "C" or better grade in Comp Sci 2500.',
                    credits: 3,
                    id: 'COMP SCI 5200',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 2500', class: [ 'COMP SCI 2500' ] } ]
                },

                {
                    type: 'Course',
                    name: 'Introduction to Artificial Intelligence',
                    department: 'Computer Science',
                    description: 'A modern introduction to AI, covering important topics of current interest such as search algorithms, heuristics, game trees, knowledge representation, reasoning, computational intelligence, and machine learning. Students will implement course concepts covering selected AI topics. Prerequisite: A "C" or better grade in Comp Sci 2500.',
                    credits: 3,
                    id: 'COMP SCI 5400',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 2500', class: [ 'COMP SCI 2500' ] } ]
                },

                {
                    type: 'Course',
                    name: 'The Structure of a Compiler',
                    department: 'Computer Science',
                    description: 'Review of Backus normal form language descriptors and basic parsing concepts. Polish and matrix notation as intermediate forms, and target code representation. Introduction to the basic building blocks of a compiler: syntax scanning, expression translation, symbol table manipulation, code generation, local optimization, and storage allocation. Prerequisite: A "C" or better grade in both Comp Sci 3500 and Comp Sci 2500.',
                    credits: 3,
                    id: 'COMP SCI 5500',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 3500 and COMP SCI 2500', class: [ 'COMP SCI 3500', 'COMP SCI 2500' ] } ]
                }
            ]
        },
        {
            type: 'Elective',
            name: 'Humanities',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'Study of Film',
                    department: 'Art',
                    description: 'A study of classic and contemporary films with emphasis on directors technique and philosophy. Films by Fellini, Antonioni plus Bergman, Chaplin, etc. will be viewed and discussed. $30 lab fee required.',
                    credits: 3,
                    id: 'ART 1180',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'Elementary Russian I',
                    department: 'Russian',
                    description: 'Introduction to reading, conversation, and grammar. Prerequisite: Entrance requirements.',
                    credits: 4,
                    id: 'RUSSIAN 1101',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'Elementary Russian II',
                    department: 'Russian',
                    description: 'Continuation of Russian 1101. Prerequisite: Russian 1101.',
                    credits: 4,
                    id: 'RUSSIAN 1102',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: []
                },
                {
                    type: 'Course',
                    name: 'Readings In Science and Literature',
                    department: 'Russian',
                    description: 'Readings in scientific writings and literature for improving comprehension of Russian publications. Prerequisite: Russian 1102.',
                    credits: 4,
                    id: 'RUSSIAN 1180',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'RUSSIAN 1102', class: [ 'RUSSIAN 1102' ] } ]
                }
            ]
        },
        {
            type: 'Elective',
            name: 'Computer Science',
            complete: false,
            possibleCourses: [
                {
                    type: 'Course',
                    name: 'Java and Object Oriented Design',
                    complete: false,
                    inProg: false,
                    department: 'Computer Science',
                    description: 'This course covers general principles of computer networking, focusing primarily on internet protocols. It covers the TCP/IP stack, with the application layer first, moving down through link and physical layers. Topics include network virtualization, security, wireless, and mobile networks, with extensive live protocol analysis. Coursework is project based. Prerequisites: A grade of "C" or better in Comp Sci 3800.',
                    credits: 3,
                    id: 'COMP SCI 2501',
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 1570', class: [ 'COMP SCI 1570' ] } ]
                },
                {
                    type: 'Course',
                    name: 'Software Engineering',
                    department: 'Computer Science',
                    description: 'Development of methodologies useful in the software engineering classical life cycle. This includes: requirements, design, implementation, and testing phases. These methodologies are reinforced through utilization of a CASE tool and a group project. Prerequisite: A "C" or better grade in Comp Sci 2500 and at least Junior standing.',
                    credits: 3,
                    id: 'COMP SCI 3100',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 2500 and at least Junior Standing', class: [ 'COMP SCI 2500' ] } ]
                },
                {
                    type: 'Course',
                    name: 'Digital Forensics',
                    department: 'Computer Science',
                    description: 'Planning/managing incidents and response related to digital forensics; identifying, collecting, and preserving digital evidence; live/dead approaches covering systems as a whole emphasizing file system forensics; analysis and interpretation of artifacts culminating in a final project consisting of a collection, analysis, and report; legal and ethical issues. Prerequisites: A "C" or better grade in both COMP SCI 3600 and COMP SCI 3800.',
                    credits: 3,
                    id: 'COMP SCI 3601',
                    complete: false,
                    inProg: false,
                    corequisites: [],
                    prerequisites: [ { description: 'COMP SCI 3600 and COMP SCI 3800', class: [ 'COMP SCI 2500', 'COMP SCI 3800' ] } ]
                }
            ]
        }
    ]
];

export default toexport;
