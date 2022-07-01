import {Component, OnInit} from '@angular/core';
import {EngModule} from "../localizations/eng.module";
import {UAModule} from "../localizations/ua.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {

  randFlag: string = 'UA'
  countryCode = this.EngLocale.Countries
  startState: boolean = true;
  currlocale = ''

  constructor(
    private EngLocale: EngModule,
    private UALocale: UAModule,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.getItem('lang')
    //@ts-ignore
    if (localStorage.getItem("lang") == 1) this.currlocale = this.UALocale.startButton
    //@ts-ignore
    else if (localStorage.getItem("lang") == 2) this.currlocale = this.EngLocale.startButton
    setInterval(() => {
      let randNum = Math.floor(Math.random() * this.countryCode.length) + 0
      this.randFlag = this.countryCode[randNum].code
    },1000)
    sessionStorage.clear()
  }

  start() {
    sessionStorage.setItem('startState', '1')
    this.router.navigate(['/play'])
  }
}
