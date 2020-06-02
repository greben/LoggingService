import {Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage, LogWebApi, LogPublisherConfig } from './log-publishers';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, catchError} from 'rxjs/operators';

const PUBLISHERS_FILE = "assets/log-publishers.json";

@Injectable()
export class LogPublishersService {
  constructor(private httpClient: HttpClient) {
    this.buildPublishers();
  }

  publishers: LogPublisher[] = [];

  buildPublishers(): void {
    let logPub: LogPublisher;

    this.getLoggers().subscribe(response => {
      for (let pub of response.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case "console":
            logPub = new LogConsole();
            break;
          case "localstorage":
            logPub = new LogLocalStorage();
            break;
          case "webapi":
            logPub = new LogWebApi(this.httpClient);
            break;
        }

        // Set location, if any, of the logging
        logPub.location = pub.loggerLocation;
        // Add publisher to array
        this.publishers.push(logPub);
      }
    });
  }

  getLoggers(): Observable<LogPublisherConfig[]> {
    return this.httpClient.get<LogPublisher>(PUBLISHERS_FILE)
    .pipe(map((response) => response), catchError(this.handleErrors))
  }

  private handleErrors(error: any): Observable<any> {
    let errors: string[] = [];
    let msg: string = "";

    msg = "Status: " + error.status;
    msg += " - Status Text: " + error.statusText;
    if(error.json()) {
      msg += " - Exception Message: " + error.json().exceptionMessage;
    }

    errors.push(msg);

    console.error("An error occurred", errors);

    return Observable.throw(errors);
  }
}
