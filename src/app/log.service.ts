import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LogService {

  logs : []
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  // Fetch Logs
  fetchLogReports(): Observable<any> {
    return this.http.get(
      "http://localhost:3000/getLogReports",
      this.httpOptions
    );
  }

  setLogReports(logs){
    this.logs = logs;
  }

  getLogReports(){
    return this.logs;
  }

  callFetchLogReports() {
    this.fetchLogReports().subscribe(res => {
      if (res) {
        this.setLogReports(res);
      } else {
        alert(res.message);
      }
    });
  }
}
