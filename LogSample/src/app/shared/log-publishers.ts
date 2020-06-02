import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { of } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { LogEntry } from './log.service';

export abstract class LogPublisher {
  location: string;

  abstract log(record: LogEntry) : Observable<boolean>;
  abstract clear() : Observable<boolean>;
}

export class LogPublisherConfig {
  loggerName: string;
  loggerLocation: string;
  isActive: boolean;
}

export class LogConsole extends LogPublisher {
  log(record: LogEntry) : Observable<boolean>{
    // Log to the console
    console.log(record.buildLogString());

    return of(true);
  }

  clear() : Observable<boolean> {
    console.clear();

    return of(true);
  }
}

export class LogLocalStorage extends LogPublisher {
  constructor() {
    super();

    this.location = "logging";
  }

  getAll(): Observable<LogEntry[]> {
    let values: LogEntry[];

    // Retrieve all values from local storage
    values = JSON.parse(localStorage.getItem(this.location)) || [];

    return of(values);
  }

  log(record: LogEntry): Observable<boolean> {
    let ret: boolean = false;
    let values: LogEntry[];

    try {
      // Gets any previous values from local storage
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      // Add new log entry to the array
      values.push(record);
      // Store the new array into local storage
      localStorage.setItem(this.location, JSON.stringify(values));

      // Set return value
      ret = true;
    }
    catch(ex){
      console.log(ex);
    }

    return of(ret);

  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return of(true);
  }
}

export class LogWebApi extends LogPublisher {
  constructor(private http: HttpClient) {
    super();

    this.location = "http://localhost:56590/api/log";
  }


  log(record: LogEntry): Observable<boolean> {
    let headers = new HttpHeaders ({'Content-Type': 'application/json'});
    this.http.post<any>(this.location, record, {headers: headers})
      .pipe(map((res) => res), catchError(this.handleErrors))
      .subscribe(res => {
        console.log(res)
      });

    return of(true);
  }

  clear(): Observable<boolean> {
    // TODO: Call Web API to clear all log entries
    return of(true);
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
