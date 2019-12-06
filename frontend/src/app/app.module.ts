import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendAliveService } from './services/backendAlive';
import { HttpClientModule } from '@angular/common/http';
import { DebugFooterComponent } from './components/debug-footer/debug-footer.component';
import { LandingPageComponent } from './pages/landing/landingpage.component';
import { NotFoundComponent } from './pages/notfound/notfound.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { MaterialModule } from './material.module';
import { UserService } from './services/userService';
import { OAuthHoldComponent } from './pages/oauth-hold.component';
import { DegreePlanService } from './services/degreePlanService';

@NgModule({
  declarations: [
    AppComponent,
    DebugFooterComponent,
    LandingPageComponent,
    NotFoundComponent,
    OAuthHoldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [ BackendAliveService, UserService, DegreePlanService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
