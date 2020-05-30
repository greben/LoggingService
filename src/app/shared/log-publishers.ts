import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { LogEntry } from './log.service';

export abstract class LogPublisher {
  location: string;

  abstract log(record: LogEntry) : Observable<boolean>;
  abstract clear() : Observable<boolean>;
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
