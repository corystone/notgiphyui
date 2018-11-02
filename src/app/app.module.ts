import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { GifsComponent } from './gifs/gifs.component';
import { GifDetailComponent } from './gif-detail/gif-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { TagsComponent } from './tags/tags.component';
import { FavoriteDetailComponent } from './favorite-detail/favorite-detail.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagDetailComponent } from './tag-detail/tag-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    GifsComponent,
    GifDetailComponent,
    MessagesComponent,
    FavoritesComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    TagsComponent,
    FavoriteDetailComponent,
    TagListComponent,
    TagDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  exports: [
    FavoriteDetailComponent,
    TagsComponent]
})
export class AppModule { }
