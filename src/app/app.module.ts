import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UAModule } from "./localizations/ua.module";
import { EngModule } from "./localizations/eng.module";
import { QuizComponent } from './quiz/quiz.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StartPageComponent } from './start-page/start-page.component';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { TestComponent } from './test/test.component';
import {MatButtonModule} from "@angular/material/button";
import { DialogComponent } from './dialogs/returnDialog/dialog.component';
import { EndDialogComponent } from './dialogs/end-dialog/end-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    NavbarComponent,
    StartPageComponent,
    TestComponent,
    DialogComponent,
    EndDialogComponent,
  ],
  imports: [
    BrowserModule,
    UAModule,
    EngModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    StartPageComponent
  ],
  entryComponents: [DialogComponent]
})
export class AppModule { }
