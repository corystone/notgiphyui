import { GifService } from './../gif.service';
import { Component, OnInit } from '@angular/core';
import { Gif } from '../gif';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit {
  gifs: Gif[];

  onSearch(q: string): void {
    this.getGifs(q);
  }

  getGifs(q: string): void {
    this.gifService.getGifs(q).subscribe(gifs => this.gifs = gifs);
  }

  constructor(
    private gifService: GifService,
    private messageService: MessageService) {}

  ngOnInit() {
  }
}
