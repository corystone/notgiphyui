import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Gif } from './gif';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private endpoint = 'http://45.32.194.17:9999/';

  getGif(id: string): Observable<Gif> {
    const url = this.endpoint + 'gif?id=' + id;
    return this.http.get<Gif>(url, {withCredentials: true}).pipe(
      tap(gif => this.log('fetched gif: ' + id)),
      catchError(this.handleError('getGif', null))
    );
  }

  getGifs(q: string, p: number): Observable<Gif[]> {
    let search = this.endpoint + '?q=' + q;
    if (p > 1) {
      search = search + '&p=' + String(p);
    }
    return this.http.get<Gif[]>(search).pipe(
      tap(gifs => this.log('fetched gifs')),
      catchError(this.handleError('getGifs', []))
    );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`GifService: ${message}`);
  }

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
}
