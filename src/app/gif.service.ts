import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Gif } from './gif';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private endpoint = 'http://notgiphy.guitarzan.us:9999/';

  getGif(id: string): Observable<Gif> {
    const url = this.endpoint + 'gifs';
    const params = new HttpParams().set('id', id);

    return this.http.get<Gif>(url, {params, withCredentials: true}).pipe(
      tap(gif => this.log('fetched gif: ' + id)),
      catchError(this.handleError('getGif', null))
    );
  }

  addFavorite(favorite: Gif): Observable<any> {
    const url = this.endpoint + 'favorites';
    return this.http.post(url, favorite, {withCredentials: true});
  }

  getFavorite(favorite: string): Observable<Gif> {
    const search = this.endpoint + 'favorites';
    const params = new HttpParams();
    params.set('favorite', favorite);

    return this.http.get<Gif>(search, {withCredentials: true}).pipe(
      tap(gifs => this.log('fetched favorites')),
      catchError(this.handleError('getFavorites', null))
    );

  }

  getFavorites(): Observable<Gif[]> {
    const search = this.endpoint + 'favorites';

    return this.http.get<Gif[]>(search, {withCredentials: true}).pipe(
      tap(gifs => this.log('fetched favorites')),
      catchError(this.handleError('getFavorites', []))
    );
  }

  getGifs(q: string, p: number): Observable<Gif[]> {
    const search = this.endpoint;
    let params = new HttpParams().set('q', q);
    if (p > 1) {
      params = params.set('p', String(p));
    }

    console.log(params);
    return this.http.get<Gif[]>(search, {params: params, withCredentials: true}).pipe(
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
