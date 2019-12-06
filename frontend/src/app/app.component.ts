import { Component, OnInit } from '@angular/core';
import { BackendAliveService } from './services/backendAlive';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private backend: BackendAliveService;
  public backendStatus: string;
  public productionStatus: string;

  constructor(private b: BackendAliveService) {
    this.backendStatus = 'Loading...';
    this.productionStatus = environment.production ? 'Production' : 'Development';
    this.backend = b;
  }

  ngOnInit() {
    setTimeout(() => {
      this.b.checkAlive().subscribe(
        next => this.backendStatus = 'OK!',
        error => this.backendStatus = `Unreachable: ${error}`
      );
    }, 200);
  }
}
