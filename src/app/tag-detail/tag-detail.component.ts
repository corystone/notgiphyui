import { GifService } from './../gif.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Gif } from '../gif';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class TagDetailComponent implements OnInit {
  tag: string;
  gifs: Gif[];

  constructor(
    private route: ActivatedRoute,
    private gifService: GifService
  ) { }

  ngOnInit() {
    this.tag = this.route.snapshot.params.tag;
    console.log('this tag', this.tag);
    this.gifService.getFavoritesFromTag(this.tag).subscribe(gifs => this.gifs = gifs);
  }
}
