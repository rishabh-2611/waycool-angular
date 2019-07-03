import { Component, OnInit, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { ChartType } from "chart.js";
import { MultiDataSet, Label, Colors } from "ng2-charts";

import { LogService } from "../log.service";

interface Logs {
  id?: number;
  name: string;
  email: string;
  date: string;
  time: string;
  photoUrl: string;
  activity: string;
}

var LOGS: Logs[] = [];

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  router: Router;

  googleLogins;
  facebookLogins;
  emailLogins;
  totalLogs;

  // Doughnut Chart
  public doughnutChartLabels: Label[] = [
    "Google Logins",
    "Facebook Logins",
    "Email Logins"
  ];
  doughnutChartData: MultiDataSet = [[350, 450, 100]];
  public doughnutChartType: ChartType = "doughnut";
  public chartColors: Array<any> = [
    {
      backgroundColor: ["#dd4b39", "#3b5998", "#FF822E"]
    }
  ];

  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  // Doughnut Chart End

  // Log Reports (Table)
  page = 1;
  pageSize = 4;
  collectionSize;

  get logs(): Logs[] {
    return LOGS.map((logs, i) => ({ id: i + 1, ...logs })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
  // Log Reports End

  constructor(private injector: Injector, private logService: LogService) {
    this.router = this.injector.get(Router);
  }

  ngOnInit() {
    if (!localStorage.getItem("email")) {
      this.router.navigate([""]);
    }
    LOGS = this.logService.getLogReports();
    this.collectionSize = LOGS.length;

    this.googleLogins = LOGS.filter(function(LOGS) {
      return LOGS.activity === "Google Sign In";
    });

    this.facebookLogins = LOGS.filter(function(LOGS) {
      return LOGS.activity === "Facebook Sign In";
    });

    this.emailLogins = LOGS.filter(function(LOGS) {
      return LOGS.activity === "Email Sign In";
    });

    this.googleLogins = this.googleLogins.length;
    this.facebookLogins = this.facebookLogins.length;
    this.emailLogins = this.emailLogins.length;
    this.totalLogs = LOGS.length;
  }
  ngAfterViewInit() {
    this.doughnutChartData = [
      [this.googleLogins, this.facebookLogins, this.emailLogins]
    ];
  }
}
