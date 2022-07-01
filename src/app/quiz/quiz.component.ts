import {Component,  OnInit} from '@angular/core';
import {UAModule} from "../localizations/ua.module";
import {EngModule} from "../localizations/eng.module";
import {Subscription} from "rxjs";
import {stringify} from "@angular/compiler/src/util";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(
    private UALocal : UAModule,
    private EngLocal: EngModule,
  ) {}

  randNum = -1
  randCountry = ''
  countryListEng = this.EngLocal.CountryCodes
  countryListUA = this.UALocal.countriesUa
  answButtons = [-1, -1, -1, -1]
  correctAnswPos = -1
  currLocale: {
    name: any;
  }[] = []

  ngOnInit(){
    // @ts-ignore
    if (localStorage.getItem("lang") == 1) {this.currLocale = this.countryListUA}
    // @ts-ignore
    else if (localStorage.getItem("lang") == 2) {this.currLocale = this.countryListEng}
    // @ts-ignore
    if (sessionStorage.getItem('startState') == 1) {
      this.startPlaying()
      sessionStorage.setItem('startState', '0')
    }
    else this.play()
  }

  startPlaying(){
    this.randNum = this.randomInRange(0, 164)
    this.answerVar(this.randNum)
    sessionStorage.setItem('country', this.countryListEng[this.randNum].code)
    sessionStorage.setItem('selectedPos', '-1')
    this.play()
  }

  play(){
    // @ts-ignore
    this.randCountry = sessionStorage.getItem('country')
    console.log(this.randCountry)
    // @ts-ignore
    this.answButtons = JSON.parse(sessionStorage.getItem('answers'))
    console.log(this.answButtons[0]+', '+this.countryListEng[this.answButtons[0]].name)
    console.log(this.answButtons[1]+', '+this.countryListEng[this.answButtons[1]].name)
    console.log(this.answButtons[2]+', '+this.countryListEng[this.answButtons[2]].name)
    console.log(this.answButtons[3]+', '+this.countryListEng[this.answButtons[3]].name)
    // @ts-ignore
    this.correctAnswPos = JSON.parse(sessionStorage.getItem('corrPos'))
    this.checkAnsw()
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
    let answers = [-1, -1, -1, -1]
    let corrPos = this.randomInRange(0, 4)
    for (let i=0; i<4;i++){
      let num = this.randNotRepeat(correctAnsw)
      answers[i] = num
    }
    answers[corrPos] = correctAnsw
    sessionStorage.removeItem('answers')
    sessionStorage.setItem('corrPos', JSON.stringify(corrPos))
    sessionStorage.setItem('answers', JSON.stringify(answers))
  }

  selectAnsw(pos: number){
    sessionStorage.setItem('selectedPos', JSON.stringify(pos))
  }

  checkAnsw() {
    let pos = sessionStorage.getItem('selectedPos')
    // @ts-ignore
    if (pos != -1){
      //@ts-ignore
      if (pos == this.correctAnswPos) {
        //@ts-ignore
        document.getElementById(pos).style.background = 'rgba(0, 255, 0, 0.5)'
      } else {
        // @ts-ignore
        document.getElementById(pos).style.background = 'rgba(255, 0, 0, 0.5)'
      }
      // @ts-ignore
      document.getElementById('answerButtons').style.pointerEvents = 'none'
    }
  }
}
