import { Component, OnInit } from '@angular/core';
import {EngModule} from "../../localizations/eng.module";
import {UAModule} from "../../localizations/ua.module";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  currLocale: any

  constructor(
    private EngLocale: EngModule,
    private UALocale: UAModule
  ) { }

  ngOnInit(): void {
    // @ts-ignore
    if (localStorage.getItem("lang") == 1) {this.currLocale = this.UALocale}
    // @ts-ignore
    else if (localStorage.getItem("lang") == 2) {this.currLocale = this.EngLocale}
  }

}
