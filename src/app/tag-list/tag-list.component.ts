import { GifService } from './../gif.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from '../tag';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  tags: Tag[];

  encode(s: string): string {
    return encodeURIComponent(s);
  }

  constructor(
    private gifService: GifService
  ) { }

  ngOnInit() {
    this.gifService.getAllTags().subscribe(tags => this.tags = tags);
  }

}
