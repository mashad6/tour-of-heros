import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Costume } from './costume';
import { MessageService } from './message.service';
import { Heropower } from './heropower';
import {Hero} from './hero';

@Injectable({
  providedIn: 'root'
})
export class CustomeService {
  private cUrl = 'http://localhost:4000/costume';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Costumes from the server  */
  getCostumes (): Observable<Costume[]> {
    return this.http.get<Costume[]>(this.cUrl)
      .pipe(
        tap(_ => this.log('fetched costumes!')),
        catchError(this.handleError<Costume[]>('getCostumes', []))
      );
  }

  getCostume(id: number): Observable<Costume> {
    const url = `http://localhost:4000/costume/${id}`;
    return this.http.get<Costume>(url).pipe(
      tap(_ => this.log(`fetched costume id=${id}`)),
      catchError(this.handleError<Costume>(`getcostume id=${id}`))
    );
  }


  addCostumeToHero(ob:Heropower): Observable<Costume> {
    
    let hid=ob.hid;
    let pid=ob.pid;
    const url = `http://localhost:4000/costume/${hid}`;
 
    return this.http.put<any>(url,{hid,pid},this.httpOptions).pipe(
      tap(_ => this.log(`added cost to hero id=${hid}`)),
      catchError(this.handleError<any>(`addCostumeToHero id=${hid}`))
    );  
}


  //deleting costume associated to hero

  deleteCost (ob:Heropower): Observable<Costume> {
    //const id = typeof hero === 'number' ? hero: hero.id;
    let hid=ob.hid;
    let pid=ob.pid;
    
    const url = `http://localhost:4000/costume/del/${hid}`;
    return this.http.put<any>(url,{hid,pid},this.httpOptions).pipe(
      tap(_ => this.log(`deleted cos id=${hid}`)),
      catchError(this.handleError<any>('deleteHero'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  


}