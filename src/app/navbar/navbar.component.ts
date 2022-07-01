import { Component, OnInit } from '@angular/core';
import {UAModule} from "../localizations/ua.module";
import {EngModule} from "../localizations/eng.module";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currLocale: any

  constructor(
    private UALocal : UAModule,
    private EngLocal: EngModule
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    if (localStorage.getItem("lang") == 1) {this.currLocale = this.UALocal}
    // @ts-ignore
    else if (localStorage.getItem("lang") == 2) {this.currLocale = this.EngLocal}
  }

  rememberLocale(num: number) {
    localStorage.setItem("lang",String(num))
    window.location.reload()
  }
}
