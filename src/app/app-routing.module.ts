import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "./quiz/quiz.component";
import {StartPageComponent} from "./start-page/start-page.component";

const routes: Routes = [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: StartPageComponent},
      {path: 'play', component: QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
