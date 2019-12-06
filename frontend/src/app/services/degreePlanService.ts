import { Injectable } from '@angular/core';
import { DegreePlanInfo, DegreePlan, DegreePlanInfoAPI } from '../models/degreeplan';
import { Observable } from 'rxjs';
import { Degree } from '../models/degree';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DegreePlanService {
    private authOptions: object;
    constructor(private http: HttpClient) {
        this.authOptions = {
            headers: {
                authorization: `Bearer ${environment.jwt}`
            }
        };
    }

    public getDegreePlans(): Observable<DegreePlanInfo[]> {
        return new Observable<DegreePlanInfo[]>((observer) => {
            /*
            this.http.get<DegreePlanInfoAPI[]>(`${environment.backendUrl}/degreeplan/all`, this.authOptions).subscribe(
                response => {
                    const toReturn: DegreePlanInfo[] = [ ];
                    for (const item of response) {
                        const foundItem = toReturn.find(deg => deg.id === item.groupId);
                        if (foundItem === undefined) {
                            toReturn.push({
                                id: item.groupId,
                                catalogYear: item.year,
                                degrees: [{
                                    catalogYear: item.year.getFullYear().toString(),
                                    type: item.isMajor ? 'Major' : 'Minor',
                                    department: item.name
                                }]
                            });
                        } else {
                            foundItem.degrees.push({
                                catalogYear: item.year.getFullYear().toString(),
                                type: item.isMajor ? 'Major' : 'Minor',
                                department: item.name
                            });
                        }
                    }
                    observer.next(toReturn);
                    observer.complete();
                },
                error => observer.error(`Problem getting user's degree plans: HTTP ${error.status} - ${error.statusText}`)
            );
            */
            const fake = new DegreePlanInfo({
                year: '2019',
                isMajor: true,
                name: 'BS Computer Science',
                groupId: 1
            });
            const fakeComplete = new DegreePlanInfo({
                year: '2018',
                isMajor: true,
                name: 'BS Computer Science',
                groupId: 2
            });
            observer.next([ fake, fakeComplete ]);
        });
    }

    public generateDegreePlan(info: DegreePlanInfo): Observable<void> {
        return new Observable<void>((observer) => {
            observer.error('Not implemented!');
        });
    }

    public getDegrees(): Observable<Array<Degree>> {
        return new Observable<Degree[]>((observer) => {
            this.http.get<Degree[]>(`${environment.backendUrl}/degree/all`, this.authOptions).subscribe(
                response => {
                    observer.next(response);
                    observer.complete();
                },
                error => observer.error(`Problem getting degrees: HTTP ${error.status} - ${error.statusText}`)
            );
        });
    }

    public createDegreePlan(degrees: Degree[], maxHours: number): Observable<void> {
        const toSend = [];
        for (const degree of degrees) {
            toSend.push({ department: degree.department, isMajor: degree.type === 'Major', year: degree.catalogYear });
        }
        return new Observable<void>((observer) => {
            this.http.post(`${environment.backendUrl}/degreeplan`, toSend, this.authOptions).subscribe(
                result => {
                    observer.next();
                    observer.complete();
                },
                error => observer.error(`Problem creating a degree plan: HTTP ${error.status} - ${error.statusText}`)
            );
        });
    }

    public deleteDegreePlan(plan: DegreePlanInfo): Observable<void> {
        /*
        for (const group of plan)
        */
        return new Observable<void>((observer) => {
            return observer.error('Not implemented!');
        });
    }
}
