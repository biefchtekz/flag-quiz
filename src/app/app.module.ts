import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {UAModule} from "./localizations/ua.module";
import {EngModule} from "./localizations/eng.module";
import { QuizComponent } from './quiz/quiz.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StartPageComponent } from './start-page/start-page.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    NavbarComponent,
    StartPageComponent
  ],
    imports: [
        BrowserModule,
        UAModule,
        EngModule,
        AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    StartPageComponent
  ]
})
export class AppModule { }
