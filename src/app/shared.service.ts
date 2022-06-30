import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subj = new Subject<void>()

  sendClickEvent(){
    this.subj.next()
  }

  getEvent():Observable<any>{
    return this.subj.asObservable()
  }

}
