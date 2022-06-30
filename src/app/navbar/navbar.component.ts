import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  EngLocale = false
  reloadLocale$ = new Subject<void>()
  constructor() { }

  ngOnInit(): void {
  }

  log() {
    console.log(this.EngLocale)
  }

  rememberLocale(num: number) {
    localStorage.setItem("lang",String(num))
    window.location.reload()
  }
}
