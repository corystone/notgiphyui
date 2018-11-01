import { GifService } from './../gif.service';
import { Component, OnInit, Input } from '@angular/core';
import { Gif } from '../gif';
import { nextContext } from '@angular/core/src/render3';

@Component({
  selector: 'app-favorite-detail',
  templateUrl: './favorite-detail.component.html',
  styleUrls: ['./favorite-detail.component.css']
})
export class FavoriteDetailComponent implements OnInit {

  favorites: Gif[];
  isFavorite = false;

  private _gif: Gif;

  get gif(): Gif {
    return this._gif;
  }

  @Input()
  set gif(gif: Gif) {
    this._gif = gif;
    if (!gif) {
      return;
    }

    console.log(gif);
    console.log(this.favorites);
    this.gifService.getFavorites().subscribe(favorites => {
      console.log('got favorites', favorites);
      this.favorites = favorites;
      for (const f of favorites) {
        if (!f) {
          continue;
        }
        if (f.id === this.gif.id) {
          this.isFavorite = true;
          break;
        }
      }
    });
  }

  constructor(
    private gifService: GifService
  ) { }

  favorite(gif: Gif) {
    if (!gif) {
      return;
    }
    console.log('FAVORITING ', gif.id);
    this.gifService.addFavorite(gif).subscribe(data => {
      this.isFavorite = true;
    });
  }

  ngOnInit() {
    console.log(this.gif);
  }

}
