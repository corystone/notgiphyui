import { GifService } from './../gif.service';
import { Component, OnInit } from '@angular/core';
import { Gif } from '../gif';

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit {
  gifs: Gif[];

  selectedGif: Gif;
  onSelect(gif: Gif): void {
    this.selectedGif = gif;
  }

  getGifs(): void {
    this.gifService.getGifs().subscribe(gifs => this.gifs = gifs);
  }

  constructor(private gifService: GifService) {}

  ngOnInit() {
    this.getGifs();
  }
}
