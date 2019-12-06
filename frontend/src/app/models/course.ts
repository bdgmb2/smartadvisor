export class Course {
    type: 'Course';
    id: string;
    name: string;
    complete: boolean;
    inProg: boolean;
    description: string;
    department: string;
    credits: number;
    prerequisites: Requisite[];
    corequisites: Requisite[];
}

export class Elective {
    type: 'Elective';
    name: string;
    complete: boolean;
    possibleCourses: Course[];
    pickedCourse?: Course;
}

export interface Requisite {
    description: string;
    class: string[];
}
