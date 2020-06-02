import {Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage, LogWebApi } from './log-publishers';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LogPublishersService {
  constructor(private httpClient: HttpClient) {
    this.buildPublishers();
  }

  publishers: LogPublisher[] = [];

  buildPublishers(): void {
    // Create an instance of the LogConsole class
    this.publishers.push(new LogConsole());
    // Create an instance of the LogLocalStorage class
    this.publishers.push(new LogLocalStorage());
  // Create an instance of the LogWebApi class
    this.publishers.push(new LogWebApi(this.httpClient))
  }
}
