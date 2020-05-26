import { Component, OnInit } from '@angular/core';
import { LogService, LogLevel } from '../shared/log.service';

@Component({
  selector: 'log-test',
  templateUrl: './log-test.component.html',
  styleUrls: ['./log-test.component.css']
})
export class LogTestComponent  {

  constructor(private logger: LogService) {

   }

   testLog (): void {
     //this.logger.level = LogLevel.Off;
     this.logger.log("Test the log() Method", "Paul", "John", 2, 3);
   }
}
