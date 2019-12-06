import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { DegreePlanService } from 'src/app/services/degreePlanService';
import { DegreePlanInfo } from 'src/app/models/degreeplan';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NewDegreePlanComponent } from 'src/app/components/new-degreeplan/new-degreeplan.component';
import { CompletedCoursesComponent } from 'src/app/components/completed-courses/completed-courses.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    public user: User;
    public loading: boolean;
    public plans: DegreePlanInfo[];

    constructor(public userSvc: UserService, private degSvc: DegreePlanService,
                private router: Router, private snackbar: MatSnackBar, private dialog: MatDialog) {
        this.loading = true;
        this.user = null;
        this.plans = [ ];
    }

    public logout() {
        this.userSvc.logout();
        environment.pageError = 'You are now logged out.';
        this.router.navigate([ '' ]);
    }

    public createNewDegreeDialog() {
        const dialogRef = this.dialog.open(NewDegreePlanComponent, {
            maxWidth: 1200,
            minWidth: 1000
        });
    }

    public openCompletedCourses() {
        const dialogRef = this.dialog.open(CompletedCoursesComponent, {
            maxWidth: 1200,
            minWidth: 1000
        });
    }

    public deleteDegreePlan(event: Event) {
        event.stopPropagation();
    }

    ngOnInit() {
        this.userSvc.getUser().subscribe(
            user => {
                this.user = user;
                this.degSvc.getDegreePlans().subscribe(
                    degrees => {
                        this.loading = false;
                        this.plans = degrees;
                    },
                    error => {
                        this.loading = false;
                        const snackref = this.snackbar.open(error, 'OK', { verticalPosition: 'top' });
                    }
                );
            },
            error => {
                environment.pageError = 'You must log in first.';
                this.router.navigate([ '' ]);
            }
        );
    }
}
