import { Component, OnInit, Injector } from "@angular/core";
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angularx-social-login";
import { NgbDatepickerConfig } from "@ng-bootstrap/ng-bootstrap";

import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { LogService } from "../log.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [NgbDatepickerConfig]
})
export class LoginComponent implements OnInit {
  login = {
    email: "",
    password: ""
  };

  signup = {
    name: "",
    dob: {
      day: 0,
      month: 0,
      year: 0
    },
    gender: "",
    email: "",
    password: ""
  };

  user: SocialUser;
  loggedIn: boolean;

  currentTab = 1;

  isLogingIn = false;

  router: Router;

  constructor(
    private authService: AuthService,
    private injector: Injector,
    private userService: UserService,
    private logService: LogService,
    private config: NgbDatepickerConfig
  ) {
    this.router = this.injector.get(Router);
    this.config.minDate = { year: 1900, month: 1, day: 1 };
    this.config.maxDate = { year: 2018, month: 12, day: 31 };
  }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = user != null;
    });
    localStorage.clear();
  }

  restrictKeypress($e) {
    $e.preventDefault();
  }

  // User SignIn Methods

  signInManually() {
    this.isLogingIn = true;
    try {
      this.userService
        .userSignIn({
          email: this.login.email,
          password: this.login.password,
          provider: "none"
        })
        .subscribe(res => {
          if (res.isValid == true) {
            localStorage.setItem("email", this.login.email);
            this.fetchUserInfo();
          } else {
            alert(res.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  async signInWithGoogle() {
    try {
      const user = await this.authService.signIn(
        GoogleLoginProvider.PROVIDER_ID
      );
      this.userService
        .userSignIn({
          email: user.email,
          provider: user.provider
        })
        .subscribe(res => {
          if (res.isValid == true) {
            localStorage.setItem("email", user.email);
            this.fetchUserInfo();
          } else {
            alert(res.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  async signInWithFB() {
    try {
      const user = await this.authService.signIn(
        FacebookLoginProvider.PROVIDER_ID
      );
      this.userService
        .userSignIn({
          email: user.email,
          provider: user.provider
        })
        .subscribe(res => {
          if (res.isValid == true) {
            localStorage.setItem("email", user.email);
            this.fetchUserInfo();
          } else {
            alert(res.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  // User SignUp Methods
  signUpManually() {
    this.isLogingIn = true;
    this.userService
      .userSignUp({
        name: this.signup.name,
        email: this.signup.email,
        dob:
          this.signup.dob.year +
          "-" +
          ("0" + this.signup.dob.month).slice(-2) +
          "-" +
          ("0" + this.signup.dob.day).slice(-2),
        gender: this.signup.gender,
        photoUrl: "",
        isManualSignUp: true,
        isGoogleSignUp: false,
        isFacebookSignUp: false,
        google: "-",
        facebook: "-",
        isActive: true,
        userId: "-",
        startDate: new Date().getTime(),
        endDate: "-",
        password: this.signup.password
      })
      .subscribe(res => {
        if (res.isValid == true) {
          localStorage.setItem("email", this.signup.email);
          this.fetchUserInfo();
        } else {
          alert(res.message);
        }
      });
  }

  async signUpWithGoogle() {
    try {
      const user = await this.authService.signIn(
        GoogleLoginProvider.PROVIDER_ID
      );
      this.userService
        .userSignUp({
          name: user.name,
          email: user.email,
          dob: "",
          gender: "-",
          photoUrl: user.photoUrl,
          isManualSignUp: false,
          isGoogleSignUp: true,
          isFacebookSignUp: false,
          google: user.email,
          facebook: "-",
          isActive: true,
          userId: user.id,
          startDate: new Date().getTime(),
          endDate: "-",
          password: this.userService.getPassword() // Random Generated Password
        })
        .subscribe(res => {
          if (res.isValid == true) {
            localStorage.setItem("email", user.email);
            localStorage.setItem("name", user.name);
            this.fetchUserInfo();
          } else {
            alert(res.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  async signUpWithFB() {
    try {
      const user = await this.authService.signIn(
        FacebookLoginProvider.PROVIDER_ID
      );
      this.userService
        .userSignUp({
          name: user.name,
          email: user.email,
          dob: "",
          gender: "-",
          photoUrl: user.photoUrl,
          isManualSignUp: false,
          isGoogleSignUp: false,
          isFacebookSignUp: true,
          google: "-",
          facebook: user.email,
          isActive: true,
          userId: user.id,
          startDate: new Date().getTime(),
          endDate: "-",
          password: this.userService.getPassword() // Random Generated Password
        })
        .subscribe(res => {
          if (res.isValid == true) {
            localStorage.setItem("email", user.email);
            localStorage.setItem("name", user.name);
            this.fetchUserInfo();
          } else {
            alert(res.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  fetchUserInfo() {
    this.logService.callFetchLogReports();
    this.userService
      .fetchUserInfo({
        email: localStorage.getItem("email")
      })
      .subscribe(res => {
        if (res) {
          this.userService.setUserInfo(res);
          this.router.navigate(["/profile"]);
        } else {
          alert("Please try again !");
          this.router.navigate([""]);
        }
      });
  }

  gotoLogin(): void {
    this.currentTab = 1;
  }

  gotoSignUp(): void {
    this.currentTab = 2;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
