import { Component, OnInit } from '@angular/core';
import {EngModule} from "../../localizations/eng.module";
import {UAModule} from "../../localizations/ua.module";

@Component({
  selector: 'app-correct-answer',
  templateUrl: './correct-answer.component.html',
  styleUrls: ['./correct-answer.component.scss']
})
export class CorrectAnswerComponent implements OnInit {

  currLocale: any
  country: string = ''

  constructor(
    private EngLocale: EngModule,
    private UALocale: UAModule
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    if (localStorage.getItem("lang") == 1) {this.currLocale = this.UALocale}
    // @ts-ignore
    else if (localStorage.getItem("lang") == 2) {this.currLocale = this.EngLocale}
    // @ts-ignore
    this.country = this.currLocale.Countries[JSON.parse(sessionStorage.getItem('country'))].name
  }

}
