import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/userService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landingpage',
    templateUrl: './landingpage.component.html',
    styleUrls: [ './landingpage.component.scss' ]
})
export class LandingPageComponent implements OnInit {
    googleSignInURL: string;
    err?: string;

    constructor(private userSvc: UserService, private router: Router) {
        this.err = environment.pageError;
        environment.pageError = undefined;

        this.googleSignInURL = encodeURI(`https://accounts.google.com/o/oauth2/v2/auth?client_id=\
${environment.clientId}&redirect_uri=${window.location.href}oauth&response_type=code&scope=openid profile email`);
    }

    ngOnInit() {
        this.userSvc.getUser().subscribe(
            next => this.router.navigate([ '/dashboard' ]),
            error => { }
        );
    }
}
