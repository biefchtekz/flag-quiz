import {Component,  OnInit} from '@angular/core';
import {UAModule} from "../localizations/ua.module";
import {EngModule} from "../localizations/eng.module";
import {Router} from "@angular/router";
import {DialogComponent} from "../dialogs/returnDialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EndDialogComponent} from "../dialogs/end-dialog/end-dialog.component";
import {CorrectAnswerComponent} from "../dialogs/correct-answer/correct-answer.component";


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(
    private UALocal : UAModule,
    private EngLocal: EngModule,
    private router: Router,
    private dialog: MatDialog
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
  correctCounter: string | null = ''

  ngOnInit(){
    this.correctCounter = sessionStorage.getItem('counter')
    // @ts-ignore
    if (localStorage.getItem("lang") == 1) {this.currLocale = this.countryListUA}
    // @ts-ignore
    else if (localStorage.getItem("lang") == 2) {this.currLocale = this.countryListEng}
    // @ts-ignore
    if (sessionStorage.getItem('startState') == 1) {
      this.startPlaying()
      sessionStorage.setItem('usedFlags', '[]')
      sessionStorage.setItem('hpLeft', '3')
      sessionStorage.setItem('startState', '0')
      sessionStorage.setItem('counter', '0')
    }
    else this.play()
  }

  startPlaying(){
    window.location.reload()
    this.correctAnswPos = -1
    this.randNum = this.randomInRange(0, 164)
    this.answerVar(this.randNum)
    sessionStorage.setItem('country', JSON.stringify(this.randNum) )
    sessionStorage.setItem('selectedPos', '-1')
    this.play()
  }

  play(){
    // @ts-ignore
    this.randCountry = this.countryListEng.Countries[JSON.parse(sessionStorage.getItem('country'))].code
    // @ts-ignore
    this.answButtons = JSON.parse(sessionStorage.getItem('answers'))
    // @ts-ignore
    this.correctAnswPos = JSON.parse(sessionStorage.getItem('corrPos'))
    this.checkAnsw()
  }

  randomFlag(min: number, max: number): any {
    let rand = Math.floor(Math.random() * max) + min
    // @ts-ignore
    let usedFlags = JSON.parse(sessionStorage.getItem('usedFlags'))
    console.log(usedFlags)
    // @ts-ignore
    if (usedFlags.includes(rand)) {
      this.randomFlag(min, max)
    } else {
      usedFlags.push(rand)
      sessionStorage.setItem('usedFlags', JSON.stringify(usedFlags))
      return rand
    }
  }

  randomInRange(min: number, max: number){
    return Math.floor(Math.random() * max) + min
  }

  randNotRepeat(pos: number, cycles: number, correctAnsw: number, answers: number[]){
    for (let i=pos; i<cycles; i++){
      let num = this.randomInRange(0, 164)
      if (num == correctAnsw || answers.includes(num)){
        this.randNotRepeat(pos, cycles, correctAnsw, answers)
      } else {
        answers[i] = num
      }
    }
    return answers
  }

  answerVar(correctAnsw: number){
    let answers = [-1, -1, -1, -1]
    let corrPos = this.randomInRange(0, 4)
    answers = this.randNotRepeat(0, 4, correctAnsw, answers)
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
    let counter = JSON.parse(sessionStorage.getItem('counter'))
    // @ts-ignore
    this.post = +pos
    // @ts-ignore
    if (pos != -1){
      //@ts-ignore
      if (pos == this.correctAnswPos) {
        //@ts-ignore
        document.getElementById(pos).style.background = 'rgba(0, 255, 0, 0.5)'
        counter++
        sessionStorage.setItem('counter', JSON.stringify(counter))
      } else {
        // @ts-ignore
        let hp = JSON.parse(sessionStorage.getItem('hpLeft'))
        hp--
        // @ts-ignore
        setInterval(this.correctDialog('200ms', '200ms').subscribe(res => {
          if (hp == 0) this.returnHome()
        }),500)
        // @ts-ignore
        document.getElementById(pos).style.background = 'rgba(255, 0, 0, 0.5)'
        sessionStorage.setItem('hpLeft', JSON.stringify(hp))
      }
      // @ts-ignore
      document.getElementById('answerButtons').style.pointerEvents = 'none'
    }
  }

  homeDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    })
    return dialogRef.afterClosed()
  }

  correctDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    let dialogRef =  this.dialog.open(CorrectAnswerComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    })
    return dialogRef.afterClosed()
  }

  lostDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(EndDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    })
    this.router.navigate(['/'])
  }

  returnHome() {
    // @ts-ignore
    if (sessionStorage.getItem('hpLeft') == 0) {
      this.lostDialog('200ms', '200ms')
    } else {
      this.homeDialog('200ms', '200ms')
          .subscribe(res => {
            if (JSON.parse(res)) {
              this.lostDialog('200ms', '200ms')
            }
          })
    }

  }

  next() {
    // @ts-ignore
    if (JSON.parse(sessionStorage.getItem('usedFlags')).length == this.UALocal.Countries.length){
      this.router.navigate(['/'])
    } else this.startPlaying()
  }
}
