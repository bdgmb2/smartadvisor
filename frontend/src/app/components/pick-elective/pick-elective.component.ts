import { Component, Inject } from '@angular/core';
import { Elective, Course } from 'src/app/models/course';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CourseDetailsComponent } from '../course-details/course-details.component';

@Component({
    selector: 'app-pickelective',
    templateUrl: './pick-elective.component.html',
    styleUrls: [ './pick-elective.component.scss' ]
})
export class PickElectiveComponent {
    public elective: Elective;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Elective, private ref: MatDialogRef<PickElectiveComponent>,
                public newDialog: MatDialog) {
        this.elective = data;
    }

    public selectCourse(course: Course) {
        this.ref.close();
    }

    public showCourseDetails(course: Course) {
        this.newDialog.open(CourseDetailsComponent, {
            data: course,
            minWidth: 600,
            maxWidth: 1200
        });
    }
}
