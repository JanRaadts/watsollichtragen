import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiChangesService {

  private showResults: boolean = false;
  private loading: boolean = true
  private input: boolean = false
  private resultSubject = new Subject<any>();
  private loadingSubject = new Subject<any>();
  private inputSubject = new Subject<any>();

  constructor() { }

  toggleResults():void{
    this.showResults = !this.showResults;
    this.resultSubject.next(this.showResults);
      }
    
      onToggle():Observable<any>{
        return this.resultSubject.asObservable();
      }

  toggleLoading():void{
    this.loading = !this.loading;
    this.loadingSubject.next(this.loading);
          }
        
      onToggleLoading():Observable<any>{
          return this.loadingSubject.asObservable();
          }   

  toggleInput():void{
    this.input = !this.input;
    this.inputSubject.next(this.input);
    }
                
      onToggleInput():Observable<any>{
        return this.inputSubject.asObservable();
        }         
}
