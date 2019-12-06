import { Injectable, isDevMode } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { LoginResponse, LocalLoginRequest } from '../models/jwt';
import { expireCookie, generateCookie } from '../lib/dates';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private currentUser?: User;
    private http: HttpClient;

    constructor(private h: HttpClient) {
        this.http = h;
    }

    public getUser(): Observable<User> {
        if (document.cookie !== undefined) {
            const jwt = document.cookie.split(';')[0].split('=')[1];
            if (jwt !== undefined && jwt !== '') {
                environment.jwt = jwt;
            }
        } else if (environment.jwt === undefined) {
            return throwError('Not logged in');
        }
        const authOptions = {
            headers: {
                authorization: `Bearer ${environment.jwt}`
            }
        };
        return new Observable<User>((observer) => {
            if (this.currentUser !== undefined) {
                observer.next(this.currentUser);
            } else {
                this.http.get<User>(`${environment.backendUrl}/user`, authOptions).subscribe(
                    next => {
                        this.currentUser = next;
                        const expiry = new Date();
                        // Cookie lasts 12 hours
                        expiry.setTime(new Date().getTime() + (1000 * 60 * 60 * 12));
                        document.cookie = generateCookie(environment.jwt, expiry);
                        observer.next(next);
                        observer.complete();
                    },
                    error => {
                        document.cookie = expireCookie(environment.jwt);
                        environment.jwt = undefined;
                        observer.error(`Unable to get current user: ${error.status} - ${error.statusText}`);
                    }
                );
            }
        });
    }

    public localLogin(username: string): Observable<void> {
        if (!isDevMode()) {
            return throwError('Running in production, cannot perform local login');
        }
        const localLoginRequest: LocalLoginRequest = {
            user: username,
            additionalClaims: { }
        };
        return new Observable<void>((observer) => {
            this.http.post<LoginResponse>(`${environment.backendUrl}/locallogin`, localLoginRequest).subscribe(
                next => {
                    environment.jwt = next.token;
                    observer.complete();
                },
                error => observer.error(`Invalid response from backend: ${error.status} - ${error.statusText}`)
            );
        });
    }

    public login(googleKey: string): Observable<void> {
        return new Observable<void>((observer) => {
            this.http.post<LoginResponse>(`${environment.backendUrl}/login`, { code: googleKey }).subscribe(
                next => {
                    environment.jwt = next.token;
                    observer.next();
                },
                error => observer.error(`Invalid response from backend: ${error.status} - ${error.statusText}`)
            );
        });
    }

    public logout() {
        this.currentUser = undefined;
        document.cookie = expireCookie(environment.jwt);
        environment.jwt = undefined;
    }
}
