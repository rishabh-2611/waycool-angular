import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { routes } from "./routes";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from "ng2-charts";

// Components
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

// Services
import { UserService } from "./user.service";
import { LogService } from "./log.service";

// Google & FB OAuth
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
     "202677417562-gcm2r6uuqmi1ue8cui58vgck30g8hb9p.apps.googleusercontent.com"// "866475992639-g11am069tl1mcppmnv3tco3uqbevjhe1.apps.googleusercontent.com"
    )
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1604934409638292")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    routes,
    SocialLoginModule,
    HttpClientModule,
    ChartsModule],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    UserService,
    LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
