import {Injectable } from '@angular/core';
import { LogPublisher, LogConsole } from './log-publishers';

@Injectable()
export class LogPublishersService {
  constructor() {
    this.buildPublishers();
  }

  publishers: LogPublisher[] = [];

  buildPublishers(): void {
    // Create an instance of the LogConsole class
    this.publishers.push(new LogConsole());
  }
}
