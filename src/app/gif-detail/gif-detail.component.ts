import { Component, OnInit, Input } from '@angular/core';
import { Gif } from '../gif';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-gif-detail',
  templateUrl: './gif-detail.component.html',
  styleUrls: ['./gif-detail.component.css']
})

export class GifDetailComponent implements OnInit {

  @Input() gif: Gif;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  safeUrl(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustUrl(oldURL);
  }

}
