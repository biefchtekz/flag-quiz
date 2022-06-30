import {Component, Injectable, OnInit} from '@angular/core';
import {UAModule} from "../localizations/ua.module";
import {EngModule} from "../localizations/eng.module";
import {SharedService} from "../shared.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {

  // @ts-ignore
  clickEventSub:Subscription

  constructor(
    private UALocal : UAModule,
    private EngLocal: EngModule,
    private sharedService: SharedService
  ) {
    this.clickEventSub = this.sharedService.getEvent().subscribe(()=>{
      this.startPlaying()
    })
  }

  randNum = 0
  randCountry = ''
  countryListEng = this.EngLocal.CountryCodes
  countryListUA = this.UALocal.countriesUa
  answButtons = [-1, -1, -1, -1]
  correctAnswPos = -1
  currLocale: {
    name: any;
  }[] = []

  ngOnInit(){}

  public startPlaying(){
    // @ts-ignore
    if (localStorage.getItem("lang") == 1) {this.currLocale = this.countryListUA}
    // @ts-ignore
    else if (localStorage.getItem("lang") == 2) {this.currLocale = this.countryListEng}
    this.randNum = this.randomInRange(0, 164)
    this.randCountry = this.countryListEng[this.randNum].code
    this.answerVar(this.randNum)
  }

  randomInRange(min: number, max: number) {
    return Math.floor(Math.random() * max) + min
  }

  randNotRepeat(correctAnsw: number): number{
    let num = this.randomInRange(0, 164)
    if (num == correctAnsw || this.answButtons.includes(num)){
      return this.randNotRepeat(correctAnsw)
    } else {
      return num
    }
  }

  answerVar(correctAnsw: number){
    this.correctAnswPos = this.randomInRange(0, 4)
    for (let i=0; i<4;i++){
      let num = this.randNotRepeat(correctAnsw)
      this.answButtons[i] = num
    }
    this.answButtons[this.correctAnswPos] = correctAnsw
    }


  checkAnsw(pos: number, event: Event) {
    let subj = event.target
    if (pos == this.correctAnswPos) {
      //@ts-ignore
      subj.style.background = 'rgba(0, 255, 0, 0.5)'
    } else {
      //@ts-ignore
      subj.style.background = 'rgba(255, 0, 0, 0.5)'
    }
    // @ts-ignore
    document.getElementById('answerButtons').style.pointerEvents = 'none'
  }
}
