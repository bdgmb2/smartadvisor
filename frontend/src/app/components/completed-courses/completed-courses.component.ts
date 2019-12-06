import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Course } from 'src/app/models/course';

@Component({
    selector: 'app-completedcourses',
    templateUrl: 'completed-courses.component.html',
    styleUrls: [ 'completed-courses.component.scss' ]
})
export class CompletedCoursesComponent implements OnInit {
    public loading: boolean;
    public audit: Course[];

    constructor(private ref: MatDialogRef<CompletedCoursesComponent>) {
        this.loading = true;
    }

    ngOnInit() {
        setTimeout(() => {
            this.loading = false;
        }, 1500);
    }
}
