import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  userInfo = {
    _id: String,
    name: String,
    email: String,
    dob: String,
    gender: String,
    photoUrl: String,
    google: String,
    facebook: String
  };

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Headers":
      //   "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
      // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT"
    })
  };

  // SignIn
  userSignIn(user): Observable<any> {
    return this.http.post(
      "http://localhost:3000/userSignIn",
      JSON.stringify(user),
      this.httpOptions
    );
  }

  // Signup
  userSignUp(user): Observable<any> {
    return this.http.post(
      "http://localhost:3000/userSignUp",
      JSON.stringify(user),
      this.httpOptions
    );
  }

  // Generate Password
  getPassword() {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    return password;
  }

  // Fetch User Info
  fetchUserInfo(email): Observable<any> {
    return this.http.post(
      "http://localhost:3000/getUserInfo",
      JSON.stringify(email),
      this.httpOptions
    );
  }

  // Edit DOB and Gender (if not present)
  editUserInfo(user): Observable<any> {
    return this.http.post(
      "http://localhost:3000/editUserInfo",
      JSON.stringify(user),
      this.httpOptions
    );
  }

  // Setter method for User Info
  setUserInfo(userInfo) {
    this.userInfo._id = userInfo._id;
    this.userInfo.name = userInfo.name;
    this.userInfo.email = userInfo.email;
    this.userInfo.dob = userInfo.dob;
    this.userInfo.gender = userInfo.gender;
    this.userInfo.photoUrl = userInfo.photoUrl;
    this.userInfo.google = userInfo.google;
    this.userInfo.facebook = userInfo.facebook;
  }

  // Getter method for User Info
  getUserInfo() {
    return this.userInfo;
  }

  // Link User Account with Google
  linkWithGoogle(user): Observable<any> {
    return this.http.post(
      "http://localhost:3000/linkWithGoogle",
      JSON.stringify(user),
      this.httpOptions
    );
  }

  // Link User Account with Facebook
  linkWithFacebook(user): Observable<any> {
    return this.http.post(
      "http://localhost:3000/linkWithFacebook",
      JSON.stringify(user),
      this.httpOptions
    );
  }

  // Delete Account
  deleteAccount(user): Observable<any> {
    return this.http.post(
      "http://localhost:3000/deleteAccount",
      JSON.stringify(user),
      this.httpOptions
    );
  }

}
