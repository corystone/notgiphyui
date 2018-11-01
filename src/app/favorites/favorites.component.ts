import { GifService } from './../gif.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Gif } from '../gif';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  gifs: Gif[];

  getGifs(): void {
    this.gifService.getFavorites().subscribe(gifs => this.gifs = gifs);
  }

  constructor(
    private authService: AuthService,
    private gifService: GifService
  ) { }

  ngOnInit() {
    this.getGifs();
  }

}
