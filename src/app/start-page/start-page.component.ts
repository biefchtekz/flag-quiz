import { Component, OnInit } from '@angular/core';
import {EngModule} from "../localizations/eng.module";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {

  randFlag: string = 'UA'
  countryCode = this.EngLocale.CountryCodes

  constructor(
    private EngLocale: EngModule,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      let randNum = Math.floor(Math.random() * this.countryCode.length) + 0
      this.randFlag = this.countryCode[randNum].code
    },1000)
  }

  start() {
    this.sharedService.sendClickEvent()
  }
}
