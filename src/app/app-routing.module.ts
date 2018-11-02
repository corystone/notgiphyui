import { TagDetailComponent } from './tag-detail/tag-detail.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { GifDetailComponent } from './gif-detail/gif-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GifsComponent } from './gifs/gifs.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'detail/:id', component: GifDetailComponent },
  { path: 'search', component: GifsComponent },
  { path: 'search/:query', component: GifsComponent },
  { path: 'search/:query/:page', component: GifsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'tags', component: TagListComponent },
  { path: 'tags/:tag', component: TagDetailComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
