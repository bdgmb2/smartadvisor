import { Component, Input, OnInit } from '@angular/core';
import { DegreePlan, DegreePlanInfo } from 'src/app/models/degreeplan';
import { MatDialogRef, MatSliderChange } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DegreePlanService } from 'src/app/services/degreePlanService';
import { Degree } from 'src/app/models/degree';

@Component({
    selector: 'app-newdegreeplan',
    templateUrl: './new-degreeplan.component.html',
    styleUrls: [ './new-degreeplan.component.scss' ]
})
export class NewDegreePlanComponent implements OnInit {
    availableDegrees: Degree[];
    availableCatalogYears: string[];
    availableMajors: Degree[];
    availableMinors: Degree[];
    selectedCatalogYear: string;
    selectedMajors: Degree[];
    selectedMinors: Degree[];
    remedialMath?: string;
    semesterWarning: boolean;
    hourWarning: boolean;
    sliderValue: number;
    loading: boolean;
    showError: boolean;

    selectMajors: FormGroup;
    selectMinors: FormGroup;
    selectCatalogYear: FormGroup;
    loadType: 'hours' | 'number';

    constructor(private ref: MatDialogRef<NewDegreePlanComponent>, private builder: FormBuilder, private degSvc: DegreePlanService) {
        this.showError = false;
        this.loading = false;
        this.semesterWarning = false;
        this.hourWarning = false;
        this.sliderValue = 14;
        this.availableDegrees = [];
    }
    ngOnInit() {
        this.selectCatalogYear  = this.builder.group({
            selCatalogYear: new FormControl('', [ Validators.required ])
        });
        this.selectMajors = this.builder.group({
            selMajor: new FormControl('', [ Validators.required ])
        });
        this.selectMinors = this.builder.group({
            selMinor: new FormControl('', [ ])
        });
        this.loading = true;
        this.degSvc.getDegrees().subscribe(
            degrees => {
                this.availableDegrees = degrees;
                this.availableCatalogYears = degrees.map(degree => degree.catalogYear).filter((value, index, self) => {
                    return self.indexOf(value) === index;
                });
                this.loading = false;
            },
            error => {
                console.error(error);
            }
        );
    }

    public afterSelectCatalogYear() {
        const avail = this.availableDegrees.filter(degree => degree.catalogYear === this.selectedCatalogYear);
        this.availableMajors = avail.filter(degree => degree.type === 'Major');
        this.availableMinors = avail.filter(degree => degree.type === 'Minor');
    }

    public sliderChanged(event: MatSliderChange) {
        this.semesterWarning = event.value < 8;
        this.hourWarning = event.value > 19;
        this.sliderValue = event.value;
    }

    public finish() {
        this.loading = true;
        this.showError = false;
        if (this.selectedMinors === undefined) {
            this.selectedMinors = [];
        }
        const correctHours = this.loadType === 'hours' ? this.sliderValue : Math.ceil(128 / this.sliderValue);
        this.degSvc.createDegreePlan(this.selectedMajors.concat(...this.selectedMinors), correctHours).subscribe(
            response => {
                this.loading = false;
                this.ref.close();
            },
            error => {
                this.showError = true;
                this.loading = false;
                console.error(error);
            }
        );
    }
}
