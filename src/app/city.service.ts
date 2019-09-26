import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import {City} from './city';
import {Heropower} from './heropower'
@Injectable({
  providedIn: 'root'
})
export class CityService {

  private Url = 'http://localhost:4000/city';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    getCity(id: number): Observable<City> {
      const url = `${this.Url}/${id}`;
      return this.http.get<City>(url).pipe(
        tap(_ => this.log(`fetched city id=${id}`)),
        catchError(this.handleError<City>(`getcit id=${id}`))
      );
    }

    /** GET heroes from the server  */
  getCities (): Observable<City[]> {
    return this.http.get<any>(this.Url)
      .pipe(
        tap(_ => this.log('fetched citeis')),
        catchError(this.handleError<City[]>('getHeroes', []))
      );
  }

  addCityToHero(ob:Heropower): Observable<City> {
    
    let hid=ob.hid;
    let pid=ob.pid;
    const url = `http://localhost:4000/city/${hid}`;
 
    return this.http.put<any>(url,{hid,pid},this.httpOptions).pipe(
      tap(_ => this.log(`added city to hero id=${hid}`)),
      catchError(this.handleError<any>(`addcityToHero id=${hid}`))
    );  
}

deleteCity (ob:Heropower): Observable<City> {
  //const id = typeof hero === 'number' ? hero: hero.id;
  let hid=ob.hid;
  let pid=ob.pid;
  
  const url = `http://localhost:4000/city/del/${hid}`;
  return this.http.put<any>(url,{hid,pid},this.httpOptions).pipe(
    tap(_ => this.log(`deleted city id=${hid}`)),
    catchError(this.handleError<any>('deletecity'))
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