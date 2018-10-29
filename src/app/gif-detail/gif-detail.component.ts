import { GifService } from './../gif.service';
import { Component, OnInit, Input } from '@angular/core';
import { Gif } from '../gif';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.css']
})
export class GifDetailComponent implements OnInit {

  @Input() gif: Gif;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private gifService: GifService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getGif();
  }

  getGif(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.gifService.getGif(id)
      .subscribe(gif => this.gif = gif);
  }

  goBack(): void {
    this.location.back();
  }

  safeUrl(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustUrl(oldURL);
  }

}
