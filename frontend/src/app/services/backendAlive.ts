import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BackendAliveService {
    private apiVersion = '0.1';

    constructor(private http: HttpClient) { }

    public checkAlive(): Observable<string> {
        return new Observable<string>((observer) => {
            this.http.get(`${environment.backendUrl}`, { responseType: 'text' }).subscribe(
                response => {
                    if (response === this.apiVersion) {
                        observer.next('OK!');
                    } else if (response === '') {
                        observer.next('WARN - Server Did Not Return an API Version');
                    } else {
                        observer.next(`WARN - Server API "${response}", Client API "${this.apiVersion}"`);
                    }
                    observer.complete();
                },
                error => {
                    if (error) {
                        observer.error(`HTTP ${error.status} - ${error.statusText}`);
                    } else {
                        observer.error(JSON.stringify(error));
                    }
                }
            );
        });
    }
}
