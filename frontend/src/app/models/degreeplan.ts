import { Degree } from './degree';
import { Course } from './course';

export class Semester {
    name: string;
    courses: Course[];
}

export class DegreePlanInfoAPI {
    groupId: number;
    year: string;
    name: string;
    isMajor: boolean;
}

export class DegreePlanInfo {
    id: number;
    catalogYear: string;
    degrees: Degree[];

    public constructor(api: DegreePlanInfoAPI) {
        this.id = api.groupId;
        this.catalogYear = api.year;
        this.degrees = [
            {
                department: api.name,
                type: api.isMajor ? 'Major' : 'Minor',
                catalogYear: api.year
            }
        ];
    }
    public getMajorNames(): string | undefined {
        let toReturn = '';
        let first = true;
        for (const degree of this.degrees.filter(deg => deg.type === 'Major')) {
            if (!first) {
                toReturn += ', ';
            } else {
                first = false;
            }
            toReturn += degree.department;
        }
        return toReturn === '' ? undefined : toReturn;
    }

    public getMinorNames(): string | undefined {
        let toReturn = '';
        let first = true;
        for (const degree of this.degrees.filter(deg => deg.type === 'Minor')) {
            if (!first) {
                toReturn += ', ';
            } else {
                first = false;
            }
            toReturn += degree.department;
        }
        return toReturn === '' ? undefined : toReturn;
    }
}

export class DegreePlan {
    id: string;
    /*
    degrees: Degree[];
    start: Date;
    gradDate: Date;
    semesters: Semester[];
    */
}
