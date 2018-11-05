import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Gif } from './gif';
import { Tag } from './tag';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  /* GifService handles all interaction with the api server aside from auth. */
  /* Potential cleanup includes:
   * extracting the endpoint into something configurable
   * stronger error handling. */
  private endpoint = 'http://notgiphy.guitarzan.us:9999/';

  getGif(id: string): Observable<Gif> {
    const url = this.endpoint + 'api/gifs';
    const params = new HttpParams().set('id', id);

    return this.http.get<Gif>(url, {params: params, withCredentials: true}).pipe(
      catchError(this.handleError('getGif', null))
    );
  }

  getGifs(q: string, p: number): Observable<Gif[]> {
    const url = this.endpoint;
    let params = new HttpParams().set('q', q);
    if (p > 1) {
      params = params.set('p', String(p));
    }
    return this.http.get<Gif[]>(url, {params: params, withCredentials: true}).pipe(
      catchError(this.handleError('getGifs', []))
    );
  }

  addFavorite(favorite: Gif): Observable<any> {
    const url = this.endpoint + 'api/favorites';
    return this.http.post(url, favorite, {withCredentials: true});
  }

  removeFavorite(favorite: Gif): Observable<any> {
    const url = this.endpoint + 'api/favorites';
    const params = new HttpParams().set('id', favorite.id);
    return this.http.delete(url, {params: params, withCredentials: true});
  }

  getFavorites(): Observable<Gif[]> {
    const url = this.endpoint + 'api/favorites';
    return this.http.get<Gif[]>(url, {withCredentials: true}).pipe(
      catchError(this.handleError('getFavorites', []))
    );
  }

  getFavoritesFromTag(tag: string): Observable<Gif[]> {
    const url = this.endpoint + 'api/favorites';
    const params = new HttpParams().set('tag', tag);
    return this.http.get<Gif[]>(url, {params: params, withCredentials: true}).pipe(
      catchError(this.handleError('getFavorites', []))
    );
  }

  addTag(tag: Tag): Observable<any> {
    const url = this.endpoint + 'api/tags';
    return this.http.post(url, tag, {withCredentials: true});
  }

  removeTag(tag: Tag): Observable<any> {
    const url = this.endpoint + 'api/tags';
    const params = new HttpParams().set('favorite', tag.favorite).set('tag', tag.tag);
    return this.http.delete(url, {params: params, withCredentials: true});
  }

  getTags(favorite: string): Observable<Tag[]> {
    const url = this.endpoint + 'api/tags';
    const params = new HttpParams().set('favorite', favorite);
    return this.http.get<Tag[]>(url, {params: params, withCredentials: true});
  }

  getAllTags(): Observable<Tag[]> {
    const url = this.endpoint + 'api/tags';
    return this.http.get<Tag[]>(url, {withCredentials: true});
  }

  constructor(
    private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    };
  }
}
