import { Component, OnInit, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { NgbDatepickerConfig } from "@ng-bootstrap/ng-bootstrap";

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angularx-social-login";

// export class UserInfo {
//   _id: String;
//   name: String;
//   email: String;
//   dob: String;
//   gender: String;
//   photoUrl: String;
//   google: String;
//   facebook: String;
// }

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  providers: [NgbDatepickerConfig]
})
export class ProfileComponent implements OnInit {
  router: Router;
  default_img = "../../assets/images/default";

  edit = {
    dob: {
      day: 0,
      month: 0,
      year: 0
    },
    gender: String
  };

  userInfo : any ;
  // userInfo = new UserInfo();

  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private injector: Injector,
    private authService: AuthService,
    private userService: UserService,
    private config: NgbDatepickerConfig
  ) {
    this.router = this.injector.get(Router);
    this.config.minDate = { year: 1900, month: 1, day: 1 };
    this.config.maxDate = { year: 2018, month: 12, day: 31 };
  }

  ngOnInit() {
    if (!localStorage.getItem("email")) {
      this.router.navigate([""]);
    }
    this.authService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = user != null;
    });
    if(!localStorage.getItem("userInfo")){
      localStorage.setItem('userInfo', JSON.stringify(this.userService.getUserInfo()));
    }
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }

  restrictKeypress($e) {
    $e.preventDefault();
  }

  onEdit() {
    if (this.userInfo.dob == null || this.userInfo.gender == null) {
      return false;
    }
    this.userService
      .editUserInfo({
        _id: this.userInfo._id,
        dob:
          this.edit.dob.year +
          "-" +
          ("0" + this.edit.dob.month).slice(-2) +
          "-" +
          ("0" + this.edit.dob.day).slice(-2),
        gender: this.edit.gender
      })
      .subscribe(res => {
        if (res.isValid == true) {
          this.userService
            .fetchUserInfo({
              email: localStorage.getItem("email")
            })
            .subscribe(res => {
              if (res) {
                this.userService.setUserInfo(res);
                this.userInfo = this.userService.getUserInfo();
              } else {
                alert("Please try again !");
              }
            });
        } else {
          alert("Please try again !");
        }
      });
  }

  async linkWithGoogle() {
    try {
      const user = await this.authService.signIn(
        GoogleLoginProvider.PROVIDER_ID
      );
      this.userService
        .linkWithGoogle({
          _id: this.userInfo._id,
          google: user.email
        })
        .subscribe(res => {
          if (res.isValid == true) {
            this.userService.setUserInfo(res);
            this.userInfo = this.userService.getUserInfo();
          } else {
            alert(res.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  async linkWithFacebook() {
    try {
      const user = await this.authService.signIn(
        FacebookLoginProvider.PROVIDER_ID
      );
      this.userService
        .linkWithFacebook({
          _id: this.userInfo._id,
          facebook: user.email
        })
        .subscribe(res => {
          if (res.isValid == true) {
            this.userService.setUserInfo(res);
            this.userInfo = this.userService.getUserInfo();
          } else {
            alert(res.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  deleteAccount() {
    this.userService
      .deleteAccount({
        _id: this.userInfo._id
      })
      .subscribe(res => {
        if (res.isValid == true) {
          this.router.navigate([""]);
        } else {
          alert("Please try again !");
        }
      });
  }
}
