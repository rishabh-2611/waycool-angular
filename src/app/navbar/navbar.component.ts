import { Component, OnInit, Injector } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  router: Router;
  public isCollapsed = false;
  constructor(private injector: Injector) {
    this.router = this.injector.get(Router);
  }

  ngOnInit() {}

  logout() {
    localStorage.clear();
    this.router.navigate([""]);
  }
}
