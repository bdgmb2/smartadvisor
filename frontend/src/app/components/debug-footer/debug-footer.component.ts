import { Component, OnInit, isDevMode } from '@angular/core';
import { BackendAliveService } from 'src/app/services/backendAlive';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/userService';
import { merge } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-debugfooter',
    templateUrl: './debug-footer.component.html',
    styleUrls: [ './debug-footer.component.scss' ]
})
export class DebugFooterComponent implements OnInit {
    public backendStatus: string;
    public environmentStatus: string;
    public currentUser?: User;
    public loading: boolean;
    public userToLogin: string;
    public userError?: string;

    constructor(private aliveSvc: BackendAliveService, private userSvc: UserService, private router: Router) {
        this.environmentStatus = environment.production ? 'Prod' : 'Development';
        this.backendStatus = 'Loading...';
        this.loading = false;
        this.userToLogin = '';
    }

    public isDevMode = () => isDevMode();

    ngOnInit() {
        this.loading = true;
        const aliveObs = this.aliveSvc.checkAlive();
        const userObs = this.userSvc.getUser();
        aliveObs.subscribe(
            next => this.backendStatus = next,
            error => this.backendStatus = error
        );
        userObs.subscribe(
            next => this.currentUser = next,
            error => this.currentUser = undefined
        );
        merge(aliveObs, userObs).subscribe(
            next => this.loading = false,
            error => this.loading = false
        );
    }
}
