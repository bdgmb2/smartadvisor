import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { DashboardComponent } from './dashboard.component';
import { DegreePlanComponent } from 'src/app/components/degree-plan/degreeplan.component';
import { NewDegreePlanComponent } from 'src/app/components/new-degreeplan/new-degreeplan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompletedCoursesComponent } from 'src/app/components/completed-courses/completed-courses.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CourseDetailsComponent } from 'src/app/components/course-details/course-details.component';
import { PickElectiveComponent } from 'src/app/components/pick-elective/pick-elective.component';

@NgModule({
    declarations: [
        DashboardComponent,
        DegreePlanComponent,
        NewDegreePlanComponent,
        CompletedCoursesComponent,
        CourseDetailsComponent,
        PickElectiveComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        DragDropModule
    ],
    providers: [ ],
    entryComponents: [
        NewDegreePlanComponent,
        CompletedCoursesComponent,
        CourseDetailsComponent,
        PickElectiveComponent
    ]
})
export class DashboardModule { }
