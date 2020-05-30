import {Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage } from './log-publishers';

@Injectable()
export class LogPublishersService {
  constructor() {
    this.buildPublishers();
  }

  publishers: LogPublisher[] = [];

  buildPublishers(): void {
    // Create an instance of the LogConsole class
    this.publishers.push(new LogConsole());
    // Create an instance of the LogLocalStorage class
    this.publishers.push(new LogLocalStorage());
  }
}
