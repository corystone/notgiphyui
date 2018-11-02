import { GifService } from './../gif.service';
import { Component, OnInit } from '@angular/core';
import { Gif } from '../gif';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  gifs: Gif[];

  constructor(
    private gifService: GifService
  ) { }

  ngOnInit() {
    this.gifService.getFavorites().subscribe(gifs => this.gifs = gifs);
  }

}
