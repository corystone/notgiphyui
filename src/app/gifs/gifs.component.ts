import { GifService } from './../gif.service';
import { Component, OnInit } from '@angular/core';
import { Gif } from '../gif';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit {
  gifs: Gif[];
  q: string;
  p: number;
  prev: number;
  next: number;
  querySubscription: Subscription;

  onSearch(q: string): void {
    if (!q) {
      return;
    }
    this.router.navigateByUrl('/search/' + q);
  }

  getGifs(q: string, p: number): void {
    this.gifService.getGifs(q, p).subscribe(gifs => this.gifs = gifs);
  }

  updatePagination() {
    if (this.p < 1) {
      this.p = 1;
    }
    this.next = this.p + 1;
    this.prev = 0;
    if (this.p > 1) {
      this.prev = this.p - 1;
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gifService: GifService) {}

  ngOnInit() {
    this.querySubscription = this.route.paramMap.subscribe(
      (params: Params) => {
        console.log(params);
        this.q = params.get('query');
        this.p = Number(params.get('page'));
        this.updatePagination();
        if (this.q) {
          this.getGifs(this.q, this.p);
        }
      }
    );
  }
}
