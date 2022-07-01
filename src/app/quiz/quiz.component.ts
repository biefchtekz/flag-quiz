import {Component,  OnInit} from '@angular/core';
import {UAModule} from "../localizations/ua.module";
import {EngModule} from "../localizations/eng.module";
import {Router} from "@angular/router";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(
    private UALocal : UAModule,
    private EngLocal: EngModule,
    private router: Router
  ) {}

  // @ts-ignore
  hp = JSON.parse(sessionStorage.getItem('hpLeft'))
  post = -1
  randNum = -1
  randCountry = ''
  countryListEng = this.EngLocal
  countryListUA = this.UALocal
  answButtons = [-1, -1, -1, -1]
  correctAnswPos = -1
  currLocale: any
  usedFlagsArray = []

  ngOnInit(){
    // @ts-ignore
    if (localStorage.getItem("lang") == 1) {this.currLocale = this.countryListUA}
    // @ts-ignore
    else if (localStorage.getItem("lang") == 2) {this.currLocale = this.countryListEng}
    // @ts-ignore
    if (sessionStorage.getItem('startState') == 1) {
      this.startPlaying()
      sessionStorage.setItem('usedFlags', JSON.stringify(this.usedFlagsArray))
      sessionStorage.setItem('hpLeft', '3')
      sessionStorage.setItem('startState', '0')
    }
    else this.play()
  }

  startPlaying(){
    window.location.reload()
    this.correctAnswPos = -1
    this.randNum = this.randomInRange(0, 164)
    this.answerVar(this.randNum)
    sessionStorage.setItem('country', this.countryListEng.Countries[this.randNum].code)
    sessionStorage.setItem('selectedPos', '-1')
    this.play()
  }

  play(){
    // @ts-ignore
    this.randCountry = sessionStorage.getItem('country')
    // @ts-ignore
    this.answButtons = JSON.parse(sessionStorage.getItem('answers'))
    // @ts-ignore
    this.correctAnswPos = JSON.parse(sessionStorage.getItem('corrPos'))
    this.checkAnsw()
  }

  randomFlag(min: number, max: number) {
    let rand = Math.floor(Math.random() * max) + min
    // @ts-ignore
    let usedFlags = JSON.parse(sessionStorage.getItem('usedFlags'))
    // @ts-ignore
    if (usedFlags.includes(rand)) {
      return this.randomInRange(min, max)
    } else {
      usedFlags.push(rand)
      sessionStorage.setItem('usedFlags', JSON.stringify(usedFlags))
      return rand
    }
  }

  randomInRange(min: number, max: number){
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
    this.post = +pos
    // @ts-ignore
    if (pos != -1){
      //@ts-ignore
      if (pos == this.correctAnswPos) {
        //@ts-ignore
        document.getElementById(pos).style.background = 'rgba(0, 255, 0, 0.5)'
      } else {
        // @ts-ignore
        let hp = JSON.parse(sessionStorage.getItem('hpLeft'))
        hp--
        sessionStorage.setItem('hpLeft', JSON.stringify(hp))
        if (hp == 0) this.returnHome()
        // @ts-ignore
        document.getElementById(pos).style.background = 'rgba(255, 0, 0, 0.5)'
      }
      // @ts-ignore
      document.getElementById('answerButtons').style.pointerEvents = 'none'
    }
  }

  returnHome() {
    // @ts-ignore
    if (sessionStorage.getItem('hpLeft') == 0) {
      alert(this.currLocale.lost)
      this.router.navigate(['/'])
    } else {
      if (confirm(this.currLocale.home)) {
        this.router.navigate(['/'])
      }
    }

  }

  next() {
    // @ts-ignore
    if (JSON.parse(sessionStorage.getItem('usedFlags')).length == this.UALocal.Countries.length){
      this.router.navigate(['/'])
    } else this.startPlaying()
  }
}
