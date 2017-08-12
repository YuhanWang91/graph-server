import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GraphService} from "./graph.service";
import {HttpModule} from "@angular/http";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [GraphService],
  bootstrap: [AppComponent]
})
export class AppModule { }
