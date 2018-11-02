import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Gif } from './gif';
import { Tag } from './tag';
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

    return this.http.get<Gif>(url, {params: params, withCredentials: true}).pipe(
      tap(gif => this.log('fetched gif: ' + id)),
      catchError(this.handleError('getGif', null))
    );
  }

  getGifs(q: string, p: number): Observable<Gif[]> {
    const url = this.endpoint;
    let params = new HttpParams().set('q', q);
    if (p > 1) {
      params = params.set('p', String(p));
    }
    console.log(params);
    return this.http.get<Gif[]>(url, {params: params, withCredentials: true}).pipe(
      tap(gifs => this.log('fetched gifs')),
      catchError(this.handleError('getGifs', []))
    );
  }

  removeFavorite(favorite: Gif): Observable<any> {
    const url = this.endpoint + 'favorites';
    const params = new HttpParams().set('id', favorite.id);
    return this.http.delete(url, {params: params, withCredentials: true});
  }

  addFavorite(favorite: Gif): Observable<any> {
    const url = this.endpoint + 'favorites';
    return this.http.post(url, favorite, {withCredentials: true});
  }

  // getFavorite(favorite: string): Observable<Gif> {
  //   const url = this.endpoint + 'favorites';
  //   const params = new HttpParams().set('favorite', favorite);
  //   return this.http.get<Gif>(url, {params: params, withCredentials: true}).pipe(
  //     tap(gifs => this.log('fetched favorites')),
  //     catchError(this.handleError('getFavorites', null))
  //   );
  // }

  getFavorites(): Observable<Gif[]> {
    const url = this.endpoint + 'favorites';
    return this.http.get<Gif[]>(url, {withCredentials: true}).pipe(
      tap(gifs => this.log('fetched favorites')),
      catchError(this.handleError('getFavorites', []))
    );
  }

  getFavoritesFromTag(tag: string): Observable<Gif[]> {
    const url = this.endpoint + 'favorites';
    const params = new HttpParams().set('tag', tag);
    return this.http.get<Gif[]>(url, {params: params, withCredentials: true}).pipe(
      tap(gifs => this.log('fetched favorites')),
      catchError(this.handleError('getFavorites', []))
    );
  }

  addTag(tag: Tag): Observable<any> {
    const url = this.endpoint + 'tags';
    return this.http.post(url, tag, {withCredentials: true});
  }

  removeTag(tag: Tag): Observable<any> {
    const url = this.endpoint + 'tags';
    const params = new HttpParams().set('favorite', tag.favorite).set('tag', tag.tag);
    return this.http.delete(url, {params: params, withCredentials: true});
  }

  getTags(favorite: string): Observable<Tag[]> {
    const url = this.endpoint + 'tags';
    const params = new HttpParams().set('favorite', favorite);
    return this.http.get<Tag[]>(url, {params: params, withCredentials: true});
  }

  getAllTags(): Observable<Tag[]> {
    const url = this.endpoint + 'tags';
    return this.http.get<Tag[]>(url, {withCredentials: true});
  }


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

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
