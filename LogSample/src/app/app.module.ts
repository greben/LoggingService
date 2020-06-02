import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LogService } from "./shared/log.service"
import { LogTestComponent } from './log-test/log-test.component';
import { LogPublishersService } from './shared/log-publishers.service';

@NgModule({
  declarations: [
    AppComponent,
    LogTestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [LogService, LogPublishersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
