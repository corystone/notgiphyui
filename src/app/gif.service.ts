import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Gif } from './gif';
import { GIFS } from './mock-gifs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  getGifs(): Observable<Gif[]> {
    // TODO: send the message _after_ fetching the gifs
    this.messageService.add('GifService: fetched gifs');
    return of(GIFS);
  }

  constructor(private messageService: MessageService) { }
}
