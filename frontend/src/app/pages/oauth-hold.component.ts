import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-oauthhold',
    template: `<p>Please Wait...</p>`
})
export class OAuthHoldComponent implements OnInit {
    constructor(private svc: UserService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        let googleToken;
        this.route.queryParams.subscribe(
            vals => {
                googleToken = vals['code'];
                if (googleToken !== '' && googleToken !== null && googleToken !== undefined) {
                    this.svc.login(googleToken).subscribe(
                        next => {
                            this.svc.getUser().subscribe(
                                user => this.router.navigate([ 'dashboard' ]),
                                error => {
                                    environment.pageError = error;
                                    this.router.navigate([ '/' ]);
                                }
                            );
                        },
                        error => {
                            environment.pageError = error;
                            this.router.navigate([ '/' ]);
                        }
                    );
                } else {
                    environment.pageError = 'A problem occured during the Google Sign-In process. Please try again.';
                    this.router.navigate([ '/' ]);
                }
            }
        );
    }
}
