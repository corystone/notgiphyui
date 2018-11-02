import { Component, OnInit, Input } from '@angular/core';
import { Gif } from '../gif';
import { Tag } from '../tag';
import { GifService } from '../gif.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  newTag = {} as Tag;
  tags: Tag[];
  @Input() gif: Gif;

  constructor(
    private gifService: GifService
  ) { }

  addTag() {
    const foo = 1;
    this.newTag.favorite = this.gif.id;
    console.log('New Tag:', this.newTag);
    this.gifService.addTag(this.newTag).subscribe(_ => {
      this.gifService.getTags(this.gif.id).subscribe( tags => this.tags = tags);
    });
    this.newTag.tag = '';
  }

  removeTag(tag: Tag) {
    console.log('Nuking tag:', tag);
    this.gifService.removeTag(tag).subscribe(_ => {
      this.gifService.getTags(this.gif.id).subscribe( tags => this.tags = tags);
    });
  }

  ngOnInit() {
    this.gifService.getTags(this.gif.id).subscribe( tags => this.tags = tags);
  }

}
