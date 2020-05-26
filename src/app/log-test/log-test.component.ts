import { Component, OnInit } from '@angular/core';
import { LogService } from '../shared/log.service';

@Component({
  selector: 'log-test',
  templateUrl: './log-test.component.html',
  styleUrls: ['./log-test.component.css']
})
export class LogTestComponent  {

  constructor(private logger: LogService) {

   }

   testLog (): void {
     this.logger.log("This is the Log() method");
   }
}
