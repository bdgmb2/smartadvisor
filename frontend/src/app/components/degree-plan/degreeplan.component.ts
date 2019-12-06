import { Component, Input, OnInit } from '@angular/core';
import { DegreePlan, DegreePlanInfo } from 'src/app/models/degreeplan';
import { Course, Elective } from 'src/app/models/course';
import { MatDialog } from '@angular/material';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { PickElectiveComponent } from '../pick-elective/pick-elective.component';
import SemesterOne from './sem1';
import SemesterTwo from './sem2';

@Component({
    selector: 'app-degreeplan',
    templateUrl: './degreeplan.component.html',
    styleUrls: [ './degreeplan.component.scss' ]
})
export class DegreePlanComponent implements OnInit {
    public loading: boolean;
    public loadingClass: string;
    public cssResolver: string;
    @Input() degree: DegreePlanInfo;
    semesters: Array<Array<Course | Elective>>;

    constructor(private dialog: MatDialog) {
        this.loading = true;
        this.loadingClass = 'hidden';
    }

    public showCourseDetails(course: Course) {
        this.dialog.open(CourseDetailsComponent, {
            data: course,
            minWidth: 600,
            maxWidth: 1200
        });
    }

    public showElectiveDetails(elective: Elective) {
        this.dialog.open(PickElectiveComponent, {
            data: elective,
            minWidth: 600,
            maxWidth: 1200
        });
    }

    ngOnInit() {
        if (this.degree.id === 1) {
            this.semesters = SemesterOne;
        } else {
            this.semesters = SemesterTwo;
        }
        setTimeout(() => {
            this.loading = false;
            this.loadingClass = '';
        }, 500);
    }

    public resolveCSS(course: Course): string {
        let toReturn = 'mat-card cdk-drag ';
        toReturn += course.type === 'Course' ? 'course' : 'elective';
        if (course.complete) {
            toReturn += ' complete';
        } else if (course.inProg) {
            toReturn += ' inprogress';
        }
        return toReturn;
    }
}
