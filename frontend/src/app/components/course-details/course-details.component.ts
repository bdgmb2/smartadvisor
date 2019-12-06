import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Course } from 'src/app/models/course';

@Component({
    selector: 'app-coursedetails',
    templateUrl: './course-details.component.html',
    styleUrls: [ './course-details.component.scss' ]
})
export class CourseDetailsComponent {
    public course: Course;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Course, private ref: MatDialogRef<CourseDetailsComponent>,
                public newDialog: MatDialog) {
        this.course = data;
    }

    public lookupCourse(id: string) {
        /*
        this.newDialog.open(CourseDetailsComponent, {
            data: { }
        });
        */
    }
}
