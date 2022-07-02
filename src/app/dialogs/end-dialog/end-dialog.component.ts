import { Component, OnInit } from '@angular/core';
import {EngModule} from "../../localizations/eng.module";
import {UAModule} from "../../localizations/ua.module";

@Component({
  selector: 'app-end-dialog',
  templateUrl: './end-dialog.component.html',
  styleUrls: ['./end-dialog.component.scss']
})
export class EndDialogComponent implements OnInit {


  currLocale: any
  // @ts-ignore
  score: string = sessionStorage.getItem('counter')

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
